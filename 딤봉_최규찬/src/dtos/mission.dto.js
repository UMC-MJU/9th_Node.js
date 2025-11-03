export const bodyToMission = (b = {}) => ({
    title: String(b.title ?? "").trim(),
    description: b.description ?? null,
    reward: Number(b.reward ?? b.rewardPoint ?? 0),
  });
  