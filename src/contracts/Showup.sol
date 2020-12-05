pragma solidity ^0.5.0;

/**
 * @title Showup
 * @dev stores an an image's imagehash geneated for IPFS and its description on the Ethereum blockchain
 */

import "./SafeMath.sol";
import "./Ownable.sol";


contract Showup is Ownable {
    using SafeMath for uint256;
    address payable owner;
    string public name = "Showup";
    bool isActive = true;

    /**
     * @dev start a countercache called imageCount with 0.
     */
    uint256 public imageCount = 0;

    /**
     * @dev store Image-struct in a numbered mapping called images.
     */
    mapping(uint256 => Image) public images;

    /**
     * @dev Create a struct called Image.
     */
    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    /**
     * @dev Initialize events ImageCreated,ImageDeleted and imageTipped
     * to use in the front end what is happening on the blockchain when a transaction has been confirmed.
     */

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageDeleted(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    /**
     * @dev Check wether we can continue execution by evaluating the ContractIsActive ie isActive is true or not.
     */
    modifier contractIsActive() {
        require(isActive == true);
        _;
    }

    /**
     * @dev OnlyOwner controls the Circuitbreaker switch between isActive and notActive.
     */
    function toggleCircuitBreaker() external onlyOwner {
        isActive = !isActive;
    }

    /**
     * @dev Stops the contract execution forever and returns funds to the owner.
     */
    function close() public onlyOwner {
        selfdestruct(owner);
    }

    /**
     * @dev Upload Images to IPFS only when required conditions are fulfilled.
     */
    function uploadImage(string memory _imgHash, string memory _description)
        public
        contractIsActive()
    {
        /**
         * @dev Make sure the imagehash exists.
         */
        require(bytes(_imgHash).length > 0, "non existing message");

        /**
         * @dev Make sure the Description exists.
         */
        require(bytes(_description).length > 0, "we need a description");

        /**
         * @dev Make sure uploader address exists.
         */
        require(msg.sender != address(0), "sender does not exist");

        /**
         * @dev Increment countercache imageCount id upon each iteration of this function.
         */
        imageCount = imageCount.add(1);

        /**
         * @dev //add image to contract including updated imageCount countercache.
         */
        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );

        emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
    }

    /**
     * @dev  Tip Image Owner only when certain requirements are met
     */
    function tipImageOwner(uint256 _id) public payable contractIsActive() {
        /**
         * @dev  Make sure the id is valid
         */
        require(_id > 0 && _id <= imageCount, "the id is invalid");

        /**
         * @dev Fetch the _image object out of storage
         */
        Image memory _image = images[_id];

        /**
         * @dev fetch the author
         */
        address payable _author = _image.author;

        /**
         * @dev Pay author by sending them ether send the tip to the _author
         */
        address(_author).transfer(msg.value);

        /**
         * @dev Increment the tipamount and put the image back in the mapping .
         */
        _image.tipAmount = _image.tipAmount + msg.value;

        /**
         * @dev Update the _image with the tipAmount in the mapping.
         */
        images[_id] = _image;

        /**
         * @dev trigger the ImageTipped event for use in outside world fe frontend.
         */
        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author
        );
    }
}
