import { Storybook } from "common/client/utils/storybook";

/** To organize stories, you must put them into
 * this style of organizing, where all the stories
 * are in one folder under stories folder, then
 * create a `index.story.ts` that calls the function
 * `Storybook` and give it a name.
 */
export = Storybook("Introduction");
