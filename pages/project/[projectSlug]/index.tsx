import { CustomCursor } from '@/components/CustomCursor';
import { ProjectData } from '@/models/projects';
import { getProjectDataBySlug, getProjectsData } from '@/services/projects';
import colors from '@/styles/colors';
import { GetStaticPropsWithSlug } from '@/types/slug';
import { useTheme } from '@/utils/hooks';
import { GetStaticPaths, NextPage } from 'next';
import styled from 'styled-components';

const ProjectsRootPage: NextPage<{
  projectData: ProjectData;
}> = (props) => {
  const { projectData } = props;
  const { title, subtitle, year, description, imgUrl, link } = projectData;
  const { theme } = useTheme();

  return (
    <Container id="top">
      <ProjectContent>
        <CustomCursor />
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Year>{year}</Year>
        <Text>{description}</Text>
        {link ? (
          <RotatingLink
            href={link}
            theme={theme}
            target={'_blank'}
            rel="noreferrer"
          >
            <span>Aller voir le projet</span>
            <span>Aller voir le projet</span>
          </RotatingLink>
        ) : (
          ''
        )}
      </ProjectContent>
      <ImgContainer className="project-img">
        {link ? (
          <a href={link} target={'_blank'} rel="noreferrer">
            <ProjectImage src={imgUrl} alt="Illustration du projet" />
          </a>
        ) : (
          <ProjectImage src={imgUrl} alt="Illustration du projet" />
        )}
      </ImgContainer>
    </Container>
  );
};

export default ProjectsRootPage;

const Container = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 80vh;
  @media (min-width: 1100px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ImgContainer = styled.div`
  margin: 50px auto 0 auto;
  @media (min-width: 1100px) {
    margin-top: 0;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  margin: 0 auto;
  display: block;
  max-width: 500px;
`;

const ProjectContent = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 2.5rem;
  margin-top: 50px;
  @media (min-width: 1100px) {
    margin-top: 0;
  }
`;

const Subtitle = styled.h3`
  font-weight: 100;
  text-transform: uppercase;
  font-size: 1rem;
  margin: 5px 0;
`;
const Year = styled(Subtitle)`
  margin-bottom: 25px;
  @media (min-width: 1100px) {
    margin-bottom: 75px;
  }
`;

const Text = styled.p`
  padding-bottom: 25px;
  font-weight: 100;
  margin-bottom: 25px;
  @media (min-width: 1100px) {
    padding-bottom: 0px;
    padding-right: 25px;
  }
`;

const RotatingLink = styled.a`
  margin: 0 auto;
  position: relative;
  padding: 12px 20px;
  border-radius: 30px;
  background-color: ${({ theme }) =>
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
  color: ${({ theme }) =>
    theme === 'colorMode0'
      ? colors.backgroundColor0
      : theme === 'colorMode1'
      ? colors.backgroundColor1
      : theme === 'colorMode2'
      ? colors.backgroundColor2
      : theme === 'colorMode3'
      ? colors.backgroundColor3
      : theme === 'colorMode4'
      ? colors.backgroundColor4
      : theme === 'colorMode5'
      ? colors.backgroundColor5
      : colors.backgroundColor0};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 500ms ease;
  width: fit-content;

  span:first-child {
    transform: translateY(0%) rotateX(0);
    white-space: nowrap;
    transition: transform 500ms ease;
  }

  span:nth-child(2) {
    font-family: 'Playfair Display';
    font-size: 0.85rem;
    font-weight: 600;
    position: absolute;
    transform: translateY(100%) rotateX(-90deg);
    white-space: nowrap;
    transform-origin: top;
    transition: transform 500ms ease;
  }

  &:hover {
    span:first-child {
      transform: translateY(-50%) rotateX(-90deg);
    }
    span:nth-child(2) {
      transform: translateY(0%) rotateX(0);
    }
  }
`;

/* ****************************************** */

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsWithSlugs = await getProjectsData();

  if (!projectsWithSlugs) {
    throw new Error(`[BUILD ERROR] Projects slugs could not be determined`);
  }

  const paths: Array<{
    params: { projectSlug: string };
  }> = projectsWithSlugs.map((project) => ({
    params: {
      projectSlug: project._id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticPropsWithSlug<
  { [key: string]: unknown },
  {
    projectSlug: string;
  }
> = async ({ params }) => {
  const projectData = await getProjectDataBySlug(params?.projectSlug ?? '');
  if (!projectData) {
    throw new Error(
      `[BUILD ERROR] Something went wrong while fetching single project data with the following slug: ${String(
        params?.projectSlug
      )}`
    );
  }

  return {
    props: {
      projectData,
    },
  };
};
