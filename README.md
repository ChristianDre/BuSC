<<<<<<< HEAD
# Blockchain & Smart Contracts - Point of Sale App on Solana

Ziel dieser decentralized Application ist es einen QR Code zu generieren der mithilfe von einer Solana Wallet gescannt werden kann und eine Transaktion zwischen 2 Wallets auslöst. In programs/AnchirAPp/src/lib.rs ist der Smart Contract auch Program genannt, der per Javascript API innerhalb der Applikation in app/src aufgerufen wird.

# DOKUMENTATION IST AUCH IM CODE VORHANDEN
## Smart Contract Path: programs/AnchirAPp/src/lib.rs
## Web3 API & Applikation: app/src/App.js
## Tests: tests/AnchirAPp.ts


## Verwendung

Installation requirements:
Rust: https://www.rust-lang.org/tools/install

Solana: https://docs.solana.com/cli/install-solana-cli-tools

Yarn/NPM: (bei Node.js dabei)

Node.js: https://nodejs.org/en/

0. Eine Wallet auf dem Devnet erstellen & dieser Wallet Solana Airdoppen
    
    ```sh
    $ solana config set --url https://api.devnet.solana.com
    ```
    ```sh
    $ solana-keygen pubkey
    ```

    ```sh
    $ solana airdrop 2
    ```

Diese Wallet ist nun fähig einen Smart Contract auf dem Devent zu deployen. 

1. Das `Program` bzw. den `Smart Contract` builden & deployen (programs/AnchirAPp/src/lib.rs):

    ```sh
    /AnchirAPp$ anchor build
    ```

    ```sh
    /AnchirAPp$ solana program deploy $yourdirectory$/AnchirAPp/target/deploy/anchir_a_pp.so
    ```

Dann kann unter dem Solana Blockchain Explorer eurer Wahl die Program ID die in der Konsole steht gesucht werden. Dort steht wann das Program deployed bzw. verändert wurde. Hier mein Program auf dem Devnet: https://explorer.solana.com/address/2w6CVpFev9J4i9gPSwVf9HqNPUf4F4a3MxnLdh6TnYLf?cluster=devnet

2. Die `App` lokal hosten

    ```sh
    /AnchirAPp/app$ npm install
    ```

    ```sh
    /AnchirAPp/app$ npm start
    ```

localhost:3000 öffnen und QR Code neu generieren

3. Phantom Wallet (https://phantom.app/) als App auf dem Androird/iOS Smartphone öffnen, Wallet erstellen bzw. Seed Phrase eingeben & QR Code scannen


=======
# BuSC

start program deployment app folder:
- anchor deploy

deploy it to devnet:
- solana program deploy /home/cdre/Repos/AnchirAPp/target/deploy/anchir_a_pp.so

start app:
-cd app
-npm install
-npm start

go to localhost://3000

Vorbedingungen:
anchor.toml einstellungen der eigenen wallet angleichen
phantom wallet app auf dem Handy
>>>>>>> 9633366aea277e0571918504bfcecf6746859f30
