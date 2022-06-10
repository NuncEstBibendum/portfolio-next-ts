import { api } from '@/lib/axios';
import { ProjectData } from '@/models/projects';

export const getProjectsData = async (): Promise<ProjectData[] | null> => {
  try {
    const request = await api.get<ProjectData[]>('/project');
    return request.data;
  } catch {
    return null;
  }
};

export const getProjectDataBySlug = async (
  slug: string
): Promise<ProjectData | null> => {
  try {
    const request = await api.get<ProjectData>(`/project/${slug}`);
    return request.data;
  } catch {
    return null;
  }
};
