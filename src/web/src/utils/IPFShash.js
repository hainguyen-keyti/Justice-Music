import ipfs from './ipfs'
export default async function getHashIPFS(file){
    return new Promise((resolve, rejects) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = async () => {
            const buffer = await Buffer.from(reader.result)
            ipfs.add(buffer, (error, ipfsHash) => {
                if (error) {
                    return rejects(error);
                  }
                console.log(ipfsHash[0].hash)
                return resolve(ipfsHash[0].hash)
            })
        }
    });
}
