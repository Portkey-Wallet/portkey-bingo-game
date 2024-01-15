import './utils/i18n';

import Providers from './providers';
import Background from './components/Background';
import ResponsiveWrapper from './components/ResponsiveWrapper';
import LoginAndUnlock from './components/LoginAndUnlock';
import Play from './components/Play';
import Bingo from './components/Bingo';
import Header from './components/Header';
import Setting from './components/Setting';
import Loading from './components/Loading';
import NetworkError from './components/NetworkError';
import NonSSRWrapper from './components/NonSSRWrapper';
import AccountValidateWrapper from './components/AccountValidateWrapper';

export default async function IndexPage() {
  return (
    <NonSSRWrapper>
      <Providers>
        <ResponsiveWrapper>
          <Background>
            <AccountValidateWrapper>
              <Header />
              <Play />
              <Bingo />
              <LoginAndUnlock />
              <Setting />
              <Loading />
              <NetworkError />
            </AccountValidateWrapper>
          </Background>
        </ResponsiveWrapper>
      </Providers>
    </NonSSRWrapper>
  );
}
