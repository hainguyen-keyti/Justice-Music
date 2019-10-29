// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./FileStruct.sol";

contract FileStorage is FileStruct{
    
    uint VarIdFile = 0;
    uint FileLength = 0;
    uint IsUsingID = 0;
    
    address owner;
    address ownerUserBehaviorContract;
    address ownerRankingContract;
    
    event OwnershipTransferred(address indexed previousOwner,address indexed newOwner);
    
    mapping (uint => File) FileList;
    mapping (address => User) UserList;
    uint[] TimeRanking;
    mapping(uint => mapping(uint => FileRanking[])) RankingHistory;
    mapping (uint => ISO) ISOList;
    uint[] listIDISO;

    constructor() public {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier onlyOwnerContract() {
        require(
            msg.sender == ownerRankingContract ||
            msg.sender == ownerUserBehaviorContract ||
            msg.sender == owner
            );
        _;
    }
    
    function setOnlyOwnerContract(address _ownerUserBehaviorContract,address _ownerRankingContract) public onlyOwner{
        ownerUserBehaviorContract = _ownerUserBehaviorContract;
        ownerRankingContract = _ownerRankingContract;
    }

// Local------------------------------------------------------------------------

    function setVarIdFile(uint _Numb)public onlyOwnerContract{
        VarIdFile = VarIdFile + _Numb;
    }
    
    function setFileLength(uint _Numb) public onlyOwnerContract{
        FileLength = FileLength + _Numb;
    }
    
    function setIsUsingID(uint _IsUsingID) public onlyOwnerContract{
        IsUsingID = _IsUsingID;
    }
    
    function getVarIdFile() public view onlyOwnerContract returns(uint){
        return VarIdFile;
    }
    
    function getFileLength() public view onlyOwnerContract returns(uint){
        return FileLength;
    }
    
    function getIsUsingID() public view onlyOwnerContract returns(uint){
        return IsUsingID;
    }
    
    
// RankingHistory---------------------------------------------------------------
    
    function getRankingHistory(uint _TimeRanking, Kind _kind) public view onlyOwnerContract returns(FileRanking[] memory){
        return RankingHistory[_TimeRanking][uint(_kind)];
    }
    
    function getTimeRanking() public view onlyOwnerContract returns(uint[] memory){
        return TimeRanking;
    }

    function setRankingHistory(uint _Now, Kind _kind, FileRanking memory _fileRanking) public onlyOwnerContract{
        RankingHistory[_Now][uint(_kind)].push(_fileRanking);
    }
    
    function setTimeRanking(uint _Now) public onlyOwnerContract{
        TimeRanking.push(_Now);
    }

// ISOList----------------------------------------------------------------------


    function getISOList(uint _ID) public view onlyOwnerContract returns(ISO memory){
        return ISOList[_ID];
    }
    
    function getISOListInfo() public view onlyOwnerContract returns(ISO[] memory){
        ISO[] memory result = new ISO[](listIDISO.length);
        for(uint i = 0; i < listIDISO.length ; i++){
            ISO memory tempISO = ISOList[listIDISO[i]];
            result[i] = tempISO;
        }
        return result;
    }
    
    function getISOListAddress(address _addr) public view onlyOwnerContract returns(ISO[] memory){
        uint[] memory tempIDList = UserList[_addr].uploadList;
        ISO[] memory result = new ISO[](tempIDList.length);
        for(uint i = 0; i < tempIDList.length ; i++){
            if(FileList[tempIDList[i]].IsISO){
                ISO memory tempISO = ISOList[tempIDList[i]];
                result[i] = tempISO;
            }
        }
        return result;
    }
    
    function setISOList_investListISO(uint _ID, Invest memory _tempInvest) public onlyOwnerContract{
        ISOList[_ID].investListISO.push(_tempInvest);
    }
    
    function setISOList(uint _ID, uint _Numb, uint _Value) public onlyOwnerContract{
        if(_Numb == 0)
            ISOList[_ID].offerPercent = _Value;
        else if(_Numb == 1)
            ISOList[_ID].offerAmount = _Value;
        else if(_Numb == 2)
            ISOList[_ID].amountRemaining = _Value;
        else if(_Numb == 3)
            ISOList[_ID].timeExpired = _Value;
        else if(_Numb == 4)
            ISOList[_ID].ownerPercent = _Value;
        else if(_Numb == 5)
            ISOList[_ID].numberOfDownload = ISOList[_ID].numberOfDownload + _Value;
        else if(_Numb == 6)
            ISOList[_ID].week = ISOList[_ID].week + _Value;
        else
            revert();
    }
    
    function setListIDISO(uint _ID) public onlyOwnerContract{
        listIDISO.push(_ID);
    }
    
// UserList---------------------------------------------------------------------
    
    function getUserList(address _ID) public view onlyOwnerContract returns(User memory){
        return UserList[_ID];
    }
    
    function setUserList_uploadList(address _Owner, uint _ID) public onlyOwnerContract{
        UserList[_Owner].uploadList.push(_ID);
    }

    function setUserList_downloadList(address _Recipient, uint _ID) public onlyOwnerContract{
        UserList[_Recipient].downloadList.push(_ID);
    }
    
    function setUserList_investList(address _Owner, uint _ID) public onlyOwnerContract{
        UserList[_Owner].investList.push(_ID);
    }
    
// FileList---------------------------------------------------------------------

    function getFileList(uint _ID) public view onlyOwnerContract returns(File memory){
        return FileList[_ID];
    }
    
    function setFileList(uint _IDFile, File memory _File) public  onlyOwnerContract{
        FileList[_IDFile] = _File;
    }
    
    function setFileList_totalDownloader(uint _ID, uint _Numb) public onlyOwnerContract{
        FileList[_ID].totalDownloader = FileList[_ID].totalDownloader + _Numb;
    }
    
    function setFileList_weekDownloader(uint _ID, int _Numb) public onlyOwnerContract{
        FileList[_ID].weekDownloader = FileList[_ID].weekDownloader + _Numb;
    }
    
    function setFileList_IsISO(uint _ID, bool _IsISO) public onlyOwnerContract{
        FileList[_ID].IsISO = _IsISO;
    }
    
    function getFileFunc(uint[] memory _temp) public view onlyOwnerContract returns(File[] memory){
        File[] memory getFileArr = new File[](_temp.length);
        for (uint i = 0; i < _temp.length; i++){
            File memory tempFile = getFileList(_temp[i]);
            getFileArr[i] = tempFile;
        }
        return getFileArr;
    }
}