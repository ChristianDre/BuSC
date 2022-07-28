use anchor_lang::prelude::*;

// hier wird die Program ID deklariert, wenn ein neuer Smart Contract anstatt einen alten zu Aktualisieren geplant ist, muss man hier eine neue generieren
declare_id!("2w6CVpFev9J4i9gPSwVf9HqNPUf4F4a3MxnLdh6TnYLf");

// hier wird der eigentliche Smart Contract programmiert
#[program]
pub mod cpipda {
    use super::*;
    // hier werden die Basis Informationen des Smart Contracts gestezt
    pub fn set_walletTransaktion(ctx: Context<walletTransaktion>) -> Result<()> {
        //hier werden die partizipierenden Accounts gesammelt
        let walletTransaktion = &mut ctx.accounts.walletTransaktion;
        // hier die Memo
        walletTransaktion.purchaseID = "12345".to_string();
        // hier die Größe der Transaktion
        walletTransaktion.amount = "0.1".to_string();
        // hier die Wallet an der die Zahlung gehen soll
        walletTransaktion.toWallet = "FBfpvgnrMd3YnApwd13VV8Xmaf8cyXD1Q4xKmYudPiut".to_string();
        //  hier wird das Solana falls es gewrapped wird unwrapped
        walletTransaktion.bump = *ctx.bumps.get("walletTransaktion").unwrap();
        Ok(())
    }
    pub fn create_walletTransaktion(
        // hier ist der fundamenetale Smart Contract
        ctx: Context<CreateUserSocials>,
        purchaseID: String,
        toWallet: String,
        amount: String,
    ) -> Result<()> {
        let walletTransaktion = &mut ctx.accounts.walletTransaktion;
        walletTransaktion.purchaseID = purchaseID;
        walletTransaktion.toWallet = toWallet;
        walletTransaktion.amount = amount;
        Ok(())
    }
}

#[account]
// hier wird der Signer Account gefetched
pub struct UserInfo {
    pub toWallet: String,
    pub purchaseID: String,
    pub amount: String,
    pub bump: u8,
}
#[derive(Accounts)]
pub struct walletTransaktion<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
    )]
    pub walletTransaktion: Account<'info, UserInfo>,
    pub system_program: Program<'info, System>,
}

// validation struct
#[derive(Accounts)]
pub struct CreateUserSocials<'info> {
    pub user: Signer<'info>,
    pub walletTransaktion: Account<'info, UserInfo>,
}