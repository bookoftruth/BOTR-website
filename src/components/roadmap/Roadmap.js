'use client';

const Roadmap = () => {
  const phases = [
    {
      title: "Phase 1: The Meme Bot Genesis",
      description: `Creating an AI agent to generate high-quality, looping GIFs and still images on demand. Meme-worthy content, custom-tailored for our brand. Its name is "The Reader": an ethereal being made of light, born with the universe, and the guardian of the book. He is the only one able to interpret it and create its pages.`,
    },
    {
      title: "Phase 2: AI Bot Integration Across Platforms",
      description: `Telegram: When asked, the bot will talk and answer directly in the community chat.
      Twitter: The bot will monitor mentions, reply with context-based text, and automatically tweet to maximize engagement.`,
    },
    {
      title: "Phase 3: Website Expansion",
      description: `An interactive terminal for users to chat directly with the bot.`,
    },
    {
      title: "Phase 4: Image Generation and Pfp Creation",
      description: `Website: Users will be able to create images directly on the website in the unique style of the Book of Truth identity.
      Telegram: The Reader will be able to generate images based on user prompts in the chat.
      Twitter: The Reader will share generated images and related memes.`,
    },
    {
      title: "Phase 5: Voice, Stream, and Spaces",
      description: `The Reader will have its voice chosen and refined. It will be able to host spaces and streams.`,
    },
    {
      title: "Phase 6: Signature & Branding",
      description: `Each meme gets a unique identity:
      𝕭𝖔𝖔𝖐 𝖔𝖋 𝕿𝖗𝖚𝖙𝖍 - 𝔭𝔞𝔤𝔢 #00001 A signature that ensures exclusivity and recognition. These signatures will then add value for the next stages. All the images generated will also be able to be added to the book and be engraved in his history.`,
    },
    {
      title: "Phase 7: NFT Minting and Marketplace",
      description: `Every meme generated on the website could become an NFT and be owned by the minter's wallet. All these NFTs could be collected and traded on the website marketplace. Additionally, users will be able to create their own profile pictures on the website and mint them as NFTs.`,
    },
    {
      title: "Phase 8: GameFi and Treasure Hunts",
      description: `Mystery, quests, and adventure lie at the core of The Book of Truth. This phase involves creating a GameFi realm where players engage in both online and real-life treasure hunts to claim substantial $BOTR rewards. Participants must decipher ciphers and solve enigmas to uncover 12 seed phrase words for a wallet. The experience culminates in a retro-style video game interface (reminiscent of Mario or Pokémon), where players use their NFTs and clues from the narrative to race for the treasure.`,
    },
    {
      title: "Phase 9: Security on Solana",
      description: `Unlike the Book that doesn't open easily and keeps the eternal truth safe from vanishing, the Solana blockchain still has significant progress to make in terms of security. We will strive to address this issue—stay tuned!`,
    },
  ];

  return (
    <div className="h-full w-full max-w-[1350px] py-32 px-6 lg:px-20 text-shadow-white">
      <div className="space-y-12">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="p-6 rounded-lg backdrop-blur bg-white/30 shadow-xl"
            style={{
              border: "1.25px solid",
              borderImage: "linear-gradient(to bottom, #D02E95, #F38E4B) 1",
            }}
          >
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              {phase.title}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed whitespace-pre-line">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;