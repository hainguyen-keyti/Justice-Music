// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;

contract FileStruct{
    
    enum Kind {Unidentified, Image, Music}

    struct SongContract{
        uint idFile; // smartcontract song id
        string songHash;
        string contentHash;
        uint contractMoney;
        address owner;
        uint ownerCompensationAmount; // So tien owner phai boi thuong
        bool ownerApproved;
        address signer;
        uint signerCompensationAmount; // So tien signer phai boi thuong
        bool signerApproved;
        uint timeExpired;
        bool isCancel;
    }

    struct File{
        uint idFile;
        string idMongoose;
        string fileHash;
        address owner;
        uint price;
        uint totalDownloader;
        int weekDownloader;
        uint blockTime;
        bool valid;
        Kind kind;
        bool IsISO;
    }
    
    struct FileRanking{
        uint idFile;
        int lastWeekDownloader;
    }
    
    struct ISO{
        uint offerPercent;
        uint offerAmount;
        uint amountRemaining;
        uint timeExpired;
        uint ownerPercent;
        uint numberOfDownload;
        uint week;
        File ISOFile;
        Invest[] investListISO;
    }
    
    struct Invest{
        address investor;
        uint percentage;
        uint amount;
    }
    
    struct User{
        address ownerAddress;
        uint[] uploadList;
        uint[] downloadList;
        uint[] investList;
    }
}