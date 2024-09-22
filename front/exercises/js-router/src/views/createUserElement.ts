import { User } from '../models/user';
import { navigateTo } from '../controllers/routeController';

export const createUserElement = (user: User): HTMLElement => {
  const userDiv = document.createElement('div');
  userDiv.className = 'user';

  if (user.storyUrl) {
    userDiv.classList.add('has-story');
  } else {
    userDiv.classList.remove('has-story');
  }

  const userInfoDiv = document.createElement('div');
  userInfoDiv.className = 'user-info';

  const img = document.createElement('img');
  img.src = user.avatarUrl;
  img.alt = user.name;
  img.classList.add('users-list-images');
  img.addEventListener('click', () => {
    navigateTo(`/story/${user.id}`);
  });

  const name = document.createElement('span');
  name.className = 'name';
  name.textContent = user.name;

  name.addEventListener('click', () => {
    navigateTo(`/profile/${user.id}`);
  });

  userInfoDiv.appendChild(img);
  userInfoDiv.appendChild(name);

  const arrow = document.createElement('img') as HTMLImageElement;
  arrow.src = '/src/assets/profile-visit.png';
  arrow.classList.add('arrow-profile-visit');

  arrow.addEventListener('click', () => {
    navigateTo(`/profile/${user.id}`);
  });

  userDiv.appendChild(userInfoDiv);
  userDiv.appendChild(arrow);

  return userDiv;
};