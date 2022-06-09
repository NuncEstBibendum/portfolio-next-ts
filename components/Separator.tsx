import colors from '@/styles/colors';
import { useTheme } from '@/utils/hooks';
import { useTabletAndMobile } from '@/utils/hooks/useTabletAndMobile';
import styled, { keyframes } from 'styled-components';

interface Props {
  content: string;
  id?: string;
}

export const Separator = (props: Props) => {
  const { content } = props;
  const { theme } = useTheme();

  const isTabletOrMobile = useTabletAndMobile();

  if (isTabletOrMobile) {
    return (
      <SeparatorContainer theme={theme}>
        <MovingSeparatorMobile1 theme={theme}>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
        </MovingSeparatorMobile1>
        <MovingSeparatorMobile2 theme={theme}>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
        </MovingSeparatorMobile2>
      </SeparatorContainer>
    );
  } else {
    return (
      <SeparatorContainer theme={theme}>
        <MovingSeparator1 theme={theme} id="moving-separator-1">
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
        </MovingSeparator1>
        <MovingSeparator2 theme={theme} id="moving-separator-2">
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
          <p>{content}</p>
          <p>
            <span>{content}</span>
          </p>
        </MovingSeparator2>
      </SeparatorContainer>
    );
  }
};

const separatorAnimation1 = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const separatorAnimation2 = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-200%);
    }
`;

const SeparatorContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-top: 1px solid
    ${({ theme }) =>
      theme === 'colorMode0'
        ? colors.textColor0
        : theme === 'colorMode1'
        ? colors.textColor1
        : theme === 'colorMode2'
        ? colors.textColor2
        : theme === 'colorMode3'
        ? colors.textColor3
        : theme === 'colorMode4'
        ? colors.textColor4
        : theme === 'colorMode5'
        ? colors.textColor5
        : colors.textColor0};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme === 'colorMode0'
        ? colors.textColor0
        : theme === 'colorMode1'
        ? colors.textColor1
        : theme === 'colorMode2'
        ? colors.textColor2
        : theme === 'colorMode3'
        ? colors.textColor3
        : theme === 'colorMode4'
        ? colors.textColor4
        : theme === 'colorMode5'
        ? colors.textColor5
        : colors.textColor0};
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;
`;

const MovingSeparatorMobile1 = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 35px;
  animation: ${separatorAnimation1} 120s linear infinite;
  text-transform: uppercase;
  p {
    margin-left: 25px;
    white-space: nowrap;
  }
  span {
    color: ${({ theme }) =>
      theme === 'colorMode0'
        ? colors.accent0
        : theme === 'colorMode1'
        ? colors.accent1
        : theme === 'colorMode2'
        ? colors.accent2
        : theme === 'colorMode3'
        ? colors.accent3
        : theme === 'colorMode4'
        ? colors.accent4
        : theme === 'colorMode5'
        ? colors.accent5
        : colors.accent0};
  }
`;

const MovingSeparatorMobile2 = styled(MovingSeparatorMobile1)`
  animation: ${separatorAnimation2} 120s linear infinite;
  animation-delay: -60s;
`;

const MovingSeparator1 = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  font-size: 35px;
  text-transform: uppercase;
  will-change: transform;
  left: -60px;
  p {
    margin-left: 25px;
    white-space: nowrap;
  }
  span {
    color: ${({ theme }) =>
      theme === 'colorMode0'
        ? colors.accent0
        : theme === 'colorMode1'
        ? colors.accent1
        : theme === 'colorMode2'
        ? colors.accent2
        : theme === 'colorMode3'
        ? colors.accent3
        : theme === 'colorMode4'
        ? colors.accent4
        : theme === 'colorMode5'
        ? colors.accent5
        : colors.accent0};
  }
  animation: ${separatorAnimation1} 240s linear infinite;
`;

const MovingSeparator2 = styled(MovingSeparator1)`
  animation: ${separatorAnimation2} 240s linear infinite;
  animation-delay: -120s;
`;
