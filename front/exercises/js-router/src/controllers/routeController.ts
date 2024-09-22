import { fetchUsers } from './userController';
import { displayUsers } from '../views/displayUsers';
import { displayUserProfile } from '../views/displayUserProfile';
import { displayUserStory } from '../views/displayUserStory';

export const handleRoute = async () => {
  const path = window.location.pathname;
  const mainContent = document.getElementById('main-content')!;
  const storyContent = document.getElementById('story-content')!;
  const profileContent = document.getElementById('profile-content')!;

  mainContent.style.display = 'none';
  storyContent.style.display = 'none';
  profileContent.style.display = 'none';

  const users = await fetchUsers();

  const profileMatch = path.match(/^\/profile\/(\d+)$/);
  const storyMatch = path.match(/^\/story\/(\d+)$/);

  if (profileMatch) {
    const userId = profileMatch[1];
    const user = users.find(user => user.id === Number(userId));
    displayUserProfile(user);
  } else if (storyMatch) {
    const userId = storyMatch[1];
    const user = users.find(user => user.id === Number(userId));
    displayUserStory(user);
  } else {
    mainContent.style.display = 'block';
  }
};

export const navigateTo = (path: string) => {
  history.pushState({}, '', path);
  handleRoute();
};