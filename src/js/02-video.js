import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_LOCAL_STORAGE_TIME = 'videoplayer-current-time';

const response = localStorage.getItem(KEY_LOCAL_STORAGE_TIME);
if (response) {
  const dataTimeVideoPlayer = JSON.parse(response);
  player.setCurrentTime(dataTimeVideoPlayer.seconds);
}

player.on(
  'timeupdate',
  throttle(function (data) {
    console.log('played the video!', data);

    localStorage.setItem(KEY_LOCAL_STORAGE_TIME, JSON.stringify(data));
  }, 1000)
);
