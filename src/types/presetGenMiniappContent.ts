import type { MediaType } from './media';

export enum InputItemType {
  Text = 'text',
  Image = 'image',
  Video = 'video',
}

export enum PreviewsLayoutType {
  Previews = 'previews',
}

export interface PreviewMedia {
  src: string;
  poster?: string;
  type: 'image' | 'video';
  title: string;
  description: string;
}

export interface SidebarHeader {
  title: string;
  hasCloseIcon: boolean;
  appIconName: string;
  previewMedia: PreviewMedia;
}

export interface SidebarFooter {
  primaryActionTitle: string;
}

export interface Sidebar {
  header: SidebarHeader;
  footer: SidebarFooter;
}

export interface PreviewsLayout {
  sidebar: Sidebar;
}

export interface Drive {
  toolId: 'gen-ai';
  folderName: 'GenAI';
}

export interface InputItem {
  type: InputItemType;
  src: string;
  width: number;
  height: number;
  title?: string;
  value?: string;
}

export interface TextItem {
  type: 'text';
  id: string;
  value: string;
}

export interface Project {
  category: string;
  resultType: MediaType;
  webhookId: string;
  layout: PreviewsLayout;
  inputs: Array<InputItem | TextItem>;
  drive: Drive;
}
