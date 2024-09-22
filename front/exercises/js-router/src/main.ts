import './styles/main.scss';
import { fetchUsers } from './controllers/userController';
import { displayUsers } from './views/displayUsers';
import { handleRoute } from './controllers/routeController';

window.addEventListener('popstate', handleRoute);

document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();
  displayUsers(users);
  handleRoute();

  const backButton = document.getElementById('story-back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }
});