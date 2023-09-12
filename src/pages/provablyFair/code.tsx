import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function RollCode() {
  const codeString = `const serverSeedByte = Buffer.from(serverSeed, "hex");
const hashData = clientSeed + "-" + round;
const hmacResult = crypto
  .createHmac("sha512", serverSeedByte)
  .update(hashData)
  .digest();
const hashResult = hmacResult.toString("hex");
const subHash = hashResult.substring(8, 16);
const number = parseInt(subHash, 16);
const roll = (number % 1000000) + 1;`;
  return (
    <SyntaxHighlighter language="javascript" style={atomOneDark}>
      {codeString}
    </SyntaxHighlighter>
  );
}
