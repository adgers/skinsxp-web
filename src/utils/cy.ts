import crypto from 'crypto';

function getPublishHash(serverSeed:string, serverSalt:string){
  //将serverSeed和serverSalt转成byte后相加，然后sha256
  const serverSeedByte = Buffer.from(serverSeed, 'hex');
  const serverSaltByte = Buffer.from(serverSalt, 'hex');
  const serverSeedSaltByte = Buffer.concat([serverSeedByte, serverSaltByte]);
  const hash = crypto.createHash('sha256');
  hash.update(serverSeedSaltByte);
  const hashByte = hash.digest();
  const hashStr = hashByte.toString('hex');
  return hashStr;
}

function getRoll(serverSeed:string, round:number, clientSeed:string){
  const serverSeedByte = Buffer.from(serverSeed, 'hex');
  const hashKey = serverSeedByte;
  const hashData = clientSeed + "-" + round;
  const hmacResult = crypto.createHmac('sha512', hashKey).update(hashData).digest();
  const hashResult = hmacResult.toString('hex');
  const subHash = hashResult.substring(8, 16);
  const number = parseInt(subHash, 16);
  const roll = number % 1000000 + 1;
  return roll;
}


var hash = getPublishHash("868234e03892322364c51ed9d52bf78d","edf6c1529ff60e40")

var roll = getRoll("868234e03892322364c51ed9d52bf78d",390,"b306823db9c75a9a")

console.log(hash)

console.log(roll);