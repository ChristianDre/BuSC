use anchor_lang::prelude::*;

declare_id!("2w6CVpFev9J4i9gPSwVf9HqNPUf4F4a3MxnLdh6TnYLf");

#[program]
pub mod cpipda {
    use super::*;
    pub fn set_walletTransaktion(ctx: Context<walletTransaktion>) -> Result<()> {
        let walletTransaktion = &mut ctx.accounts.walletTransaktion;
        walletTransaktion.purchaseID = "12345".to_string();
        walletTransaktion.amount = "0.1".to_string();
        walletTransaktion.toWallet = "empty".to_string();
        walletTransaktion.bump = *ctx.bumps.get("walletTransaktion").unwrap();
        Ok(())
    }
    pub fn create_walletTransaktion(
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
    // space: 8 discriminator + 2 level + 4 purchaseID length + 200 purchaseID + 1 bump
    #[account(
        init,
        payer = user,
        space = 8 + 2 + 4 + 600 + 1, seeds = [b"user-socials", user.key().as_ref()], bump
    )]
    pub walletTransaktion: Account<'info, UserInfo>,
    pub system_program: Program<'info, System>,
}

// validation struct
#[derive(Accounts)]
pub struct CreateUserSocials<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user-socials", user.key().as_ref()], bump = walletTransaktion.bump)]
    pub walletTransaktion: Account<'info, UserInfo>,
}