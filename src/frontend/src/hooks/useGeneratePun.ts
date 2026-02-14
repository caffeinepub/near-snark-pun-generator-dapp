import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGeneratePun() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      
      // Generate large random BigInt values to support expanded backend catalog
      // Using a range that ensures good distribution across the backend's pun collection
      const randomIndex = BigInt(Math.floor(Math.random() * 1000000));
      const randomFocusIndex = BigInt(Math.floor(Math.random() * 1000000));
      
      const pun = await actor.generatePun(randomIndex, randomFocusIndex);
      
      if (!pun || pun.includes('out of bounds') || pun.includes('unsafe content')) {
        throw new Error('Failed to generate a valid pun');
      }
      
      return pun;
    },
  });
}
