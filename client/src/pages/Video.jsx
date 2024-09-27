import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import logo from "../assets/youtube.png";

function Video() {
  const { search } = useLocation();
  const currentUrl = new URLSearchParams(search).get("url");

  const [mediaUrl, setMediaUrl] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [isFormatAudio, setIsFormatAudio] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [media, setMedia] = useState({
    title: "",
    artist: "",
    thumbnail: "",
    duration: 0,
    audioFormats: [],
    videoFormats: [],
    finalUrl: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/video?url=${extractVideoCodes(currentUrl)}`)
      .then((response) => {
        setLoading(false);
        console.log(response.data);

        setMedia({
          title: response.data.title,
          artist: response.data.channel.name,
          thumbnail: response.data.thumbnails[3].url,
          duration: response.data.lengthSeconds,
          audioFormats: response.data.audios.items,
          videoFormats: response.data.videos.items,
          finalUrl: response.data.audios.items[0].url,
          // quality: "720p",
          // url: response.data.url,
        });
      });
  }, []);

  const extractVideoCodes = (url) => {
    const regex =
      /(?:v=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/|\/live\/|watch\/|\/e\/|\/shorts\/|\/watch\?v=|youtu.be\/|\/watch\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const setDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const fetchDownloadUrl = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `http://localhost:3001/download?url=${mediaUrl}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const newBlob = new Blob([response.data], { type: "video/mp4" });
    const newUrl = URL.createObjectURL(newBlob);
    setDownloadUrl(newUrl);
  };

  const downloadMedia = async (e) => {
    e.preventDefault();
    // setLoadingUrl(true);
    console.log(media);
    // const videoUrl = media.finalUrl;
    // // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    // const blobVideo = await fetch(videoUrl).then((r) => r.blob());
    // const blobUrl = window.URL.createObjectURL(blobVideo);
    // console.log(blobUrl);

    window.open(media.finalUrl);
    // setLoadingUrl(false);
    // const link = document.createElement("a");
    // link.href = blobUrl;
    // link.download = "video.mp4";
    // link.click();
  };

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="bg-white dark:bg-zinc-900 p-5">
      <div className="flex">
        <div className="flex flex-1 items-center gap-3">
          <img src={logo} alt="" className="w-8" />
          <span className="hidden xs:block font-bold text-2xl text-gray-900 dark:text-white">
            Youtube Downloader
          </span>
        </div>

        <form className="" onSubmit={fetchDownloadUrl}>
          <div className="relative">
            <input
              type="search"
              name="link"
              defaultValue={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="block min-w-full p-3 pr-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
              placeholder="Enter video link or text"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-1.5 bottom-[5px] bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 px-3 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <i className="far fa-search"></i>
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={downloadMedia}>
        <section className="flex flex-col gap-3 max-w-[700px] mx-auto mt-5 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          {/* Img */}
          <div className="flex justify-center rounded-md bg-gray-800 dark:bg-gray-900">
            <img alt="" className="h-24" src={media.thumbnail} />
            <div></div>
          </div>

          {/* Bar */}
          <div className="flex flex-col gap-2">
            <div className="bg-green-400">k</div>
            <div className="flex justify-between">
              <div className="p-1 px-2 rounded-lg border font-semibold dark:text-white border-gray-300 dark:border-gray-600">
                00:00:00
              </div>
              <div className="p-1 px-2 rounded-lg border font-semibold dark:text-white border-gray-300 dark:border-gray-600">
                {setDuration(media.duration)}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 font-semibold dark:text-white">
            {/* Formats */}
            <div className="media-input">
              <div className="label">Format:</div>
              <div className="flex gap-5">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="media"
                    id="audio-format"
                    value="audio"
                    onChange={(e) => setIsFormatAudio(e.target.checked)}
                    defaultChecked={isFormatAudio}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 outline-none"
                  />
                  <label type="radio" name="media" id="">
                    MP3
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="media"
                    id="video-format"
                    value="video"
                    onChange={(e) => setIsFormatAudio(!e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 outline-none"
                  />
                  <label type="radio" name="media" id="">
                    MP4
                  </label>
                </div>
              </div>
            </div>

            {/* Quality */}
            <div className="media-input">
              <div className="label">Quality:</div>
              <div className="flex flex-1 gap-3 items-center">
                {isFormatAudio ? (
                  <select
                    id="quality"
                    name="quality"
                    defaultValue={media.audioFormats[0].url}
                    onChange={(e) =>
                      setMedia({ ...media, finalUrl: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  >
                    {media.audioFormats.map((audio) => {
                      return (
                        <option key={audio.lastModified} value={audio.url}>
                          {audio.mimeType} - {audio.sizeText}
                        </option>
                      );
                    })}
                    {/* <option value="32">32 kbit/s - low</option>
                    <option value="64">64 kbit/s - low</option>
                    <option value="128" selected>
                      128 kbit/s - low
                    </option>
                    <option value="192">192 kbit/s - Medium</option>
                    <option value="256">256 kbit/s - High</option>
                    <option value="320">320 kbit/s - Highest</option> */}
                  </select>
                ) : (
                  <select
                    id="quality"
                    name="quality"
                    defaultValue={media.videoFormats[0].url}
                    onChange={(e) =>
                      setMedia({ ...media, finalUrl: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  >
                    {media.videoFormats
                      .sort((a, b) => a.size - b.size)
                      .map((video) => {
                        return (
                          <option key={video.lastModified} value={video.url}>
                            {video.quality} - {video.sizeText}
                          </option>
                        );
                      })}
                  </select>
                )}
                <span className="font-normal cursor-pointer hover:underline text-blue-500">
                  Upgrade for HD
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="media-input">
              <div className="label">Title:</div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                defaultValue={media.title}
                placeholder="Add a Title"
              />
            </div>

            {/* Artist */}
            {isFormatAudio && (
              <div className="media-input">
                <div className="label">Artist:</div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  defaultValue={media.artist}
                  placeholder="Add an Artist"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="self-center w-min text-base text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 outline-none"
          >
            {loadingUrl ? <i className="far fa-loader"></i> : "Download"}
          </button>
        </section>
      </form>
    </div>
  );
}

export default Video;
