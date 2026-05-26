import { Container } from '@/components/ui/Container';
import { Headline } from '@/components/ui/Headline';
import { Message } from '@/components/ui/Message';

export default function NotFoundPage() {
  return (
    <Container>
      <Headline title="Page not found" linkToHome />
      <Message>This page does not exist.</Message>
    </Container>
  );
}
