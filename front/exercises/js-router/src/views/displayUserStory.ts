import { User } from '../models/user';
import { navigateTo } from '../controllers/routeController';

export const displayUserStory = (user?: User) => {
  const storyContent = document.getElementById('story-content')!;
  storyContent.style.display = 'block';
  if (user) {
    const storyUserAvatar = document.getElementById('story-user-avatar') as HTMLImageElement;
    const storyUserName = document.getElementById('story-user-name') as HTMLSpanElement;
    const storyImage = document.getElementById('story-img') as HTMLImageElement;

    storyUserName.addEventListener('click', () => {
      navigateTo(`/profile/${user.id}`);
    })

    storyUserAvatar.src = user.avatarUrl;
    storyUserAvatar.alt = user.name;
    storyUserName.textContent = user.name;
    storyImage.src = user.storyUrl!;
  }
};