import { LoginForm } from '@/components/auth/LoginForm';
import { Container } from '@/components/ui/Container';
import { Headline } from '@/components/ui/Headline';

export default function LoginPage() {
  return (
    <Container>
      <Headline title="Login" linkToHome />
      <LoginForm />
    </Container>
  );
}
