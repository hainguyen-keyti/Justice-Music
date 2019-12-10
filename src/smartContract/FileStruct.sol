// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;

contract FileStruct{
    
    enum Kind {Unidentified, Image, Music}

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