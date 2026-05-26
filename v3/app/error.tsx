'use client';

import { Container } from '@/components/ui/Container';
import { Headline } from '@/components/ui/Headline';
import { Message } from '@/components/ui/Message';

type Props = {
  error: Error & { digest?: string };
  resetHandler?: () => void;
};

export default function GlobalError({ error, resetHandler }: Props) {
  return (
    <Container>
      <Headline title="Something went wrong" linkToHome />
      <Message>{error.message || 'An unexpected error occurred.'}</Message>

      {resetHandler && (
        <Message>
          <a onClick={resetHandler}>Try again</a>
        </Message>
      )}
    </Container>
  );
}
