//mediaType
export enum MediaType {
  image = "image",
  video = "video",
  audio = "audio",
  file = "file",
  pdf = "pdf",
  link = "link",
  voice = "voice",
}

interface MediaInterface {
  id: number;
  title: string;
  description?: string;
  url: string;
  type: MediaType;
}

class Media {
  id: number;
  title: string;
  description?: string;
  url: string;
  type: MediaType;

  constructor(data: MediaInterface) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.url = data.url;
    this.type = data.type;
  }
}

//allowable image mimes
const allowableImageMimeTypes: string[] = [
  "image/jpeg",
  "image/png",
];

//allowable video mimes
const allowableVideoMimeTypes: string[] = [
  "video/mp4",
];

//allowable audio mimes
const allowableAudioMimeTypes: string[] = [
  "audio/mpeg",
];

//allowable file mimes
const allowableFileMimeTypes: string[] = [
  "application/pdf",
];

//allowable link mimes
const allowableLinkMimeTypes: string[] = [
  "text/html",
];

//allowable voice mimes
const allowableVoiceMimeTypes: string[] = [
  "audio/mpeg",
];

const allowableMimeTypes: {
  [key: string]: string[];
} = {
  image: allowableImageMimeTypes,
  video: allowableVideoMimeTypes,
  audio: allowableAudioMimeTypes,
  file: allowableFileMimeTypes,
  pdf: allowableFileMimeTypes,
  link: allowableLinkMimeTypes,
  voice: allowableVoiceMimeTypes,
};

//get media mimes
export const getMediaMimes = (
  mediaTypes: MediaType[]
): string => {
  let mimes: string[] = [];
  mediaTypes.forEach((mediaType: MediaType) => {
    mimes = [
      ...mimes,
      ...allowableMimeTypes[mediaType],
    ];
  });
  return mimes.join(",");
};

function getMediaType(file: File) {
  const type = Object.keys(
    allowableMimeTypes
  ).find((mediaType: string) => {
    return allowableMimeTypes[mediaType].includes(
      file.type
    );
  });
  return type as MediaType;
}

export const getMediaTypes = (
  files: File[]
): MediaType[] => {
  const mediaTypes: MediaType[] = [];
  files.forEach((file: File) => {
    const type = getMediaType(file);
    if (type) {
      mediaTypes.push(type);
    }
  });
  return mediaTypes;
};

export default Media;
