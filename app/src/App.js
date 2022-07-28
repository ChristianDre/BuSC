import React, { useEffect, useRef, useState, setState } from "react";
import './App.css';
import { clusterApiUrl, Connection, PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import { encodeURL, findTransactionSignature, FindTransactionSignatureError } from '@solana/pay';
import BigNumber from 'bignumber.js';
import QRCodeStyling from "qr-code-styling";
// hier nur das styling des QR Codes (sowie in App.css)
const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: "data:image/png;base64,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",
  dotsOptions: {
    color: "#ED7128",
    type: "dots"
  },
  imageOptions: {
    imageSize: 0.3,
    hideBackgroundDots: true,
    margin: 2,
  }
});
// hier muss die Url gesetet werden, dises wird dann zum QR Code umgewandelt
function App() {
  const [url, setUrl] = useState("https://qr-code-styling.com");
  const ref = useRef({});
  const [pmtStatus, setPmtStatus] = useState(null);
  // exmaple https://explorer.solana.com/tx/quFeUqkT1HSkhKiR4B4RAvbrXaZq33Kuyy7WAg1GqWBWNsVRpKfeUNHLvMkLgCzAUYMosa4ghWgWizQ7SuSkBey?cluster=devnet


  useEffect(() => {
    qrCode.append(ref.current);
  }, []);
// hier muss der QR Code neu generiert werden wenn der Button gedrückt wird
  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);
// hier wird der Status der Transaktion abgefragt
  async function getTxnStatus(connection, reference) {
    let signatureInfo;
    let count = 0

    return new Promise((resolve, reject) => {
// checkt den Status im Intervall von 1,5 Sekunde, wenn keine Transaktion stattgefunden hat, wird der Status "failed" zurückgegeben
      const interval = setInterval(async () => {
        console.log('Checking for transaction...', count);
        try {
          signatureInfo = await findTransactionSignature(connection, reference, undefined, 'confirmed');
          clearInterval(interval);
          resolve(signatureInfo);
          return signatureInfo;
        } catch (error) {
          if (!(error instanceof FindTransactionSignatureError)) {
            console.error(error);
            clearInterval(interval);
            reject(error);
            count++
          }
        }
      },
       1500);
    });
  }
// hier wird die Transaktion erstellt mit dem Token des Program/ Smart Contracts
  async function createTxn() {

// hier mussdeklariert werden, welche Connection, wieviel und welcher Empfänger
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const program = new SystemProgram(connection.getProgramAccounts().get("2w6CVpFev9J4i9gPSwVf9HqNPUf4F4a3MxnLdh6TnYLf"));
    const recipient = new PublicKey('FBfpvgnrMd3YnApwd13VV8Xmaf8cyXD1Q4xKmYudPiut');
    const amount = new BigNumber(0.1);
    const reference = new Keypair().publicKey;
    const label = 'Chris Smart Contract Store';
    const message = 'Thank you for your purchase!';
    const memo = 'PurchaseID: 12345';
// hier wird die URL aus folgenden bestandteilen zusammengebaut:
    const url = encodeURL({ recipient, amount, reference, label, message, memo });
    setUrl(url)
    try {
      let txnLookupResults = await getTxnStatus(connection, reference)
      if (txnLookupResults) {
        setPmtStatus(txnLookupResults)
      }
    } catch (err) {
      console.log(err)
    }

  }

  return (
// Frontend
    <div className="App">
      <div>
        <h1>
          <p>Solana Pay Application</p>
        </h1>
        <div className="infoText">
          <p>Empfänger: Chris</p>
          <p>Vollständige Adresse: FBfpvgnrMd3YnApwd13VV8Xmaf8cyXD1Q4xKmYudPiut</p>
          <p>Betrag: 0.1 Sol</p>
        </div>
        {
          (!pmtStatus || pmtStatus == "reset") ? (
            <div>
              <div>
                <button onClick={createTxn}>Erstelle Transactions QR Code</button>
              </div>
              <div ref={ref} />
            </div>
          ) : (
            <div>
              <h1>Transaktion bestätigt</h1>
              <p>Transaktion ID: {pmtStatus.signature}</p>
              <p><a href={"https://explorer.solana.com/tx/" + pmtStatus.signature + "?cluster=devnet"} >zur Transaktion auf dem Blockexplorer</a></p>
              <button onClick={() => window.location.reload(false)}>Again?</button>
            </div>)
        }
      </div>
    </div >

  );
}

export default App;
