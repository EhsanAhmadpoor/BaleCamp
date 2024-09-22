import { User } from '../models/user';
import { navigateTo } from '../controllers/routeController';

export const createStoryElement = (user: User): HTMLElement => {
  const storyDiv = document.createElement('div');
  storyDiv.className = 'story';

  if (user.storyUrl) {
    storyDiv.classList.add('has-story');
  } else {
    storyDiv.classList.remove('has-story');
  }

  const img = document.createElement('img');
  img.src = user.avatarUrl;
  img.alt = user.name;
  img.classList.add('users-list-images');

  const name = document.createElement('span');
  name.textContent = user.name;

  img.addEventListener('click', () => {
    navigateTo(`/story/${user.id}`);
  });

  name.addEventListener('click', () => {
    navigateTo(`/profile/${user.id}`);
  });

  storyDiv.appendChild(img);
  storyDiv.appendChild(name);

  return storyDiv;
};
