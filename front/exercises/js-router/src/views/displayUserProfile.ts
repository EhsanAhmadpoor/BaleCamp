import { navigateTo } from '../controllers/routeController';
import { User } from '../models/user';

export const displayUserProfile = (user?: User) => {
  const profileContent = document.getElementById('profile-content')!;
  profileContent.style.display = 'block';

  const profileAvatar = document.getElementById('profile-content-avatar-image') as HTMLImageElement;
  const profileName = document.getElementById('profile-content-info-name') as HTMLSpanElement;
  const profileNumber = document.getElementById('phone-number') as HTMLAnchorElement;
  const profileBio = document.getElementById('bio') as HTMLSpanElement;
  const backArrow = document.getElementById('arrow-back') as HTMLImageElement;

  if (user) {
    profileAvatar.src = user.avatarUrl;
    profileName.textContent = user.name;
    profileNumber.textContent = '+98 ' + user.phoneNumber;
    profileNumber.href = 'tel:+98' + user.phoneNumber;
    profileBio.textContent = user.about;
  }

  backArrow.addEventListener('click', () => {
    history.back();
  });
};