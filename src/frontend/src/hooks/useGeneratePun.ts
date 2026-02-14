import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGeneratePun() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (randomIndex: bigint) => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      
      const pun = await actor.generatePun(randomIndex);
      
      if (!pun || pun.includes('out of bounds') || pun.includes('unsafe content')) {
        throw new Error('Failed to generate a valid pun');
      }
      
      return pun;
    },
  });
}
