import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchirAPp } from "../target/types/anchir_a_pp";
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

const reference = Keypair.generate().publicKey;
const signaturesForAddress = {
    [reference.toBase58()]: [{ signature: 'signature' }],
};

const connection = {
    async getSignaturesForAddress(reference: PublicKey) {
        return signaturesForAddress[reference.toBase58()] || [];
    },
} as Connection;
// hier wird überprüft ob eine Transaktion durchgeführt wurde anhand der Transaktionssignatur
describe('sucheTransaktionsSignatur', () => {
    it('gebeSignatur zurück', async () => {
        expect.assertions(1);

        const found = await findReference(connection, reference);

        expect(found).toEqual({ signature: 'signature' });
    });

    it('zeigt error wenn signatur nicht gefunden wurde', async () => {
        expect.assertions(1);

        const reference = Keypair.generate().publicKey;

        await expect(async () => await findReference(connection, reference)).rejects.toThrow('nicht gefunden');
    });
});

