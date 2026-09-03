// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Stickpot
/// @notice Fill a bowl. First fold takes the stick.
/// @dev RuffCash (RUFF) pre-contract for Robinhood 4663.
///      LetsCash already takes 0.3% on token trades (not here).
///      This pot takes 0.7% protocol + 4% talker share from each bowl fill.
///      Site ruffcash.xyz  X ruffcashXYZ  TG ruffcashXYZ

contract Bowl {
    address public immutable owner;
    string public name;

    event Filled(address indexed from, uint256 amount);
    event Emptied(address indexed to, uint256 amount);

    constructor(address owner_, string memory name_) payable {
        require(owner_ != address(0), "no owner");
        owner = owner_;
        name = name_;
    }

    receive() external payable {
        emit Filled(msg.sender, msg.value);
    }

    function empty(uint256 amount) external {
        require(msg.sender == owner, "not owner");
        require(amount <= address(this).balance, "too much");
        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "send");
        emit Emptied(owner, amount);
    }

    function emptyAll() external {
        require(msg.sender == owner, "not owner");
        uint256 bal = address(this).balance;
        (bool ok, ) = payable(owner).call{value: bal}("");
        require(ok, "send");
        emit Emptied(owner, bal);
    }
}

contract Stickpot {
    uint256 public constant MIN_FILL = 0.0104 ether;
    uint256 public constant PROTOCOL_BPS = 70;  // 0.7%
    uint256 public constant TALKER_BPS = 400;   // 4.0%
    uint256 public constant BPS = 10_000;

    address public immutable protocol;
    string public constant TITLE = "Stickpot";

    address[] public bowls;
    mapping(address => address[]) public bowlsOf;
    mapping(address => bool) public isBowl;

    event BowlOpened(
        address indexed bowl,
        address indexed owner,
        string name,
        uint256 fill,
        uint256 protocolCut,
        uint256 talkerCut
    );
    event TalkerPaid(address indexed to, uint256 amount);

    constructor(address protocol_) {
        require(protocol_ != address(0), "no protocol");
        protocol = protocol_;
    }

    function count() external view returns (uint256) {
        return bowls.length;
    }

    function talkerPot() public view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Open a bowl. 0.7% protocol, 4% talker pot, rest stays in the bowl.
    function open(string calldata name) external payable returns (address bowl) {
        require(msg.value >= MIN_FILL, "min 0.0104");
        uint256 proto = (msg.value * PROTOCOL_BPS) / BPS;
        uint256 talk = (msg.value * TALKER_BPS) / BPS;
        uint256 seed = msg.value - proto - talk;

        Bowl child = new Bowl{value: seed}(msg.sender, name);
        bowl = address(child);
        bowls.push(bowl);
        bowlsOf[msg.sender].push(bowl);
        isBowl[bowl] = true;

        if (proto > 0) {
            (bool ok, ) = payable(protocol).call{value: proto}("");
            require(ok, "protocol");
        }

        emit BowlOpened(bowl, msg.sender, name, seed, proto, talk);
    }

    /// @notice Split the talker pot equally across every open bowl owner.
    ///         One claim per bowl. Owners of many bowls get many shares.
    function payTalkers() external {
        uint256 n = bowls.length;
        require(n > 0, "no bowls");
        uint256 pot = address(this).balance;
        require(pot > 0, "empty pot");
        uint256 share = pot / n;
        require(share > 0, "dust");
        for (uint256 i; i < n; i++) {
            address who = Bowl(payable(bowls[i])).owner();
            (bool ok, ) = payable(who).call{value: share}("");
            require(ok, "talker");
            emit TalkerPaid(who, share);
        }
    }
}
