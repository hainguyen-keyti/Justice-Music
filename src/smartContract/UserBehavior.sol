// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./Token.sol";
import "./FileStorage.sol";
import "./FileStruct.sol";
import "./Ownable.sol";

contract UserBehavior is FileStruct, Ownable{
    
    event Log_uploadFile(address owner, Kind kind, uint idFile);
    event Log_downloadFile(address recipient, uint idFile);
    event Log_usingISO(address sender, uint idFile, uint offerPercent, uint offerAmount, uint maintain);
    event Log_investISO(address sender, uint idFile, uint investAmount);
    event Log_withdraw(address recipient, uint amount);
    
    Token token;
    FileStorage fileStorage;
    
    
    
    uint public getBalaceOfContract = address(this).balance;

    constructor(address _token, address _fileStorage ) public payable{
        token = Token(_token);
        fileStorage = FileStorage(_fileStorage);
    }
    
    function uploadFile(string memory _fileHash, uint _price, Kind _kind, string memory _idMongoose) public returns(uint){
        while (fileStorage.getIsUsingID() == 1){
            continue;
        }
        fileStorage.setIsUsingID(1);
        uint tempID = fileStorage.getVarIdFile();
        fileStorage.setVarIdFile(1);
        fileStorage.setIsUsingID(0);
        File memory fileTemp = File(tempID, _idMongoose, _fileHash, msg.sender, _price, 0, 0, now, true, _kind, false);
        fileStorage.setFileList(tempID, fileTemp);
        fileStorage.setUserList_uploadList(msg.sender, tempID);
        fileStorage.setFileLength(1);
        emit Log_uploadFile(msg.sender, _kind, tempID);
        return tempID;
    }

    function dowloadFile(uint _idFile) public returns(string memory){
        require(fileStorage.getFileList(_idFile).valid);
        if(fileStorage.getFileList(_idFile).kind == Kind.Music && fileStorage.getFileList(_idFile).IsISO){
            token.TransferFromTo(msg.sender, address(this), fileStorage.getFileList(_idFile).price);
            uint tempCost = ((fileStorage.getFileList(_idFile).price*fileStorage.getISOList(_idFile).ownerPercent) / 100000);
            token.TransferFromTo(address(this), fileStorage.getFileList(_idFile).owner, tempCost);
            fileStorage.setISOList(_idFile, 5, 1);
            uint timeSendISO = fileStorage.getISOList(_idFile).timeExpired + 1*fileStorage.getISOList(_idFile).week;
            if(now > timeSendISO){
                Invest[] memory arr = fileStorage.getISOList(_idFile).investListISO;
                for(uint i = 0; i < arr.length; i++){
                    uint temp = ((fileStorage.getFileList(_idFile).price*arr[i].percentage)*fileStorage.getISOList(_idFile).numberOfDownload / 100000);
                    token.TransferFromTo(address(this), arr[i].investor, temp);
                }
                fileStorage.setISOList(_idFile, 5, -(fileStorage.getISOList(_idFile).numberOfDownload));
                fileStorage.setISOList(_idFile, 6, 1);
            }
        }
        else
            token.TransferFromTo(msg.sender, fileStorage.getFileList(_idFile).owner, fileStorage.getFileList(_idFile).price);
        fileStorage.setUserList_downloadList(msg.sender, _idFile);
        fileStorage.setFileList_totalDownloader(_idFile, 1);
        fileStorage.setFileList_weekDownloader(_idFile, 1);
        emit Log_downloadFile(msg.sender, _idFile);
        return fileStorage.getFileList(_idFile).fileHash;
    }

    function getUserUpload() public view returns(File[] memory){
        File[] memory tempFile = fileStorage.getFileFunc(fileStorage.getUserList(msg.sender).uploadList);
        return tempFile;
    }
    
    function getUserDownload() public view returns(File[] memory){
        File[] memory tempFile = fileStorage.getFileFunc(fileStorage.getUserList(msg.sender).downloadList);
        return tempFile;
    }
    
    function usingISO(uint _idFile, uint _offerPercent, uint _offerAmount, uint _maintain) public{
        require(msg.sender == fileStorage.getFileList(_idFile).owner);
        require(fileStorage.getFileList(_idFile).kind == Kind.Music);
        require(!fileStorage.getFileList(_idFile).IsISO);
        require(_offerPercent <= 50000 &&_offerPercent >= 1000);
        fileStorage.setISOList(_idFile, 0, _offerPercent);
        fileStorage.setISOList(_idFile, 1, _offerAmount);
        fileStorage.setISOList(_idFile, 2, _offerAmount);
        fileStorage.setISOList(_idFile, 3, now + _maintain);
        fileStorage.setISOList(_idFile, 4, 100000);
        fileStorage.setISOList(_idFile, 5, 0);
        fileStorage.setISOList(_idFile, 6, 1);
        fileStorage.setFileList_IsISO(_idFile, true);
        fileStorage.setListIDISO(_idFile);
        emit Log_usingISO(msg.sender, _idFile, _offerPercent, _offerAmount, _maintain);
    }
    
    function investISO(uint _idFile, uint _investAmount) public{
        require(fileStorage.getISOList(_idFile).amountRemaining >= _investAmount);
        require(now <= fileStorage.getISOList(_idFile).timeExpired);
        token.TransferFromTo(msg.sender, fileStorage.getFileList(_idFile).owner, _investAmount);
        fileStorage.setISOList(_idFile, 2, fileStorage.getISOList(_idFile).amountRemaining - _investAmount);
        uint _investPercent = ((_investAmount * fileStorage.getISOList(_idFile).offerPercent) / fileStorage.getISOList(_idFile).offerAmount);
        Invest memory tempInvest = Invest(msg.sender, _investPercent, _investAmount);
        fileStorage.setISOList_investListISO(_idFile, tempInvest);
        fileStorage.setISOList(_idFile, 4, fileStorage.getISOList(_idFile).ownerPercent - _investPercent);
        fileStorage.setUserList_investList(msg.sender, _idFile);
        emit Log_investISO(msg.sender, _idFile, _investAmount);
    }
    
    function getISOId(uint _idFile) public view returns(ISO[] memory){
        ISO[] memory tempISO = new ISO[](1);
        tempISO[0] = fileStorage.getISOList(_idFile);
        return tempISO;
    }
    
    function getISOList() public view returns(ISO[] memory) {
      ISO[] memory tempISO = fileStorage.getISOListInfo();
      return tempISO;
    }
    
    function getISOAddress(address _addr) public view returns(ISO[] memory) {
      ISO[] memory tempISO = fileStorage.getISOListAddress(_addr);
      return tempISO;
    }
    
    //-------------Example about Oraclize Schedule--------------------------
    
    // function __callback(bytes32 myid, string memory result) public {
    //     if (msg.sender != provable_cbAddress()) revert();
    //     hacker();
    //     ETHUSD = result;
    //     emit LogPriceUpdated(result);
    //     updatePrice();
    // }
    
    // function updatePrice() public payable {
    //     if (provable_getPrice("URL") > address(this).balance) {
    //         emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
    //     } else {
    //         emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
    //         // provable_query(60, "URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
    //         provable_query(now+180,"WolframAlpha", "random number between 0 and 100");
    //     }
    // }


    function withdraw() public onlyOwner{
        msg.sender.transfer(getBalaceOfContract);
        emit Log_withdraw(msg.sender, getBalaceOfContract);
    }
    function selfDestruct() payable public {
        selfdestruct(0x56FB956B0787eb7098161231dD97b296adD4F02A);
    }
}
