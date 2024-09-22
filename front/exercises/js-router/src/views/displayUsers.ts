import { User } from '../models/user';
import { createStoryElement } from './createStoryElement';
import { createUserElement } from './createUserElement';
import { createBreakElement } from './createBreakElement';

export const displayUsers = (users: User[]) => {
  const storiesContainer = document.querySelector('.stories')!;
  const usersContainer = document.querySelector('.users')!;

  users.filter(user => user.storyUrl).forEach(user => {
    storiesContainer.appendChild(createStoryElement(user));
  });

  users.forEach(user => {
    usersContainer.appendChild(createBreakElement());
    usersContainer.appendChild(createUserElement(user));
  });
};