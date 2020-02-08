import { LineOrientation } from '../constants';
import { calculateAestheticLinePath } from './calculateAestheticLinePath';

describe('calculateAestheticLinePath', () => {
  const directionCombinations = [
    {
      name: 'up and right',
      start: { x: 0, y: 0 },
      end: { x: 500, y: 200 },
    },
    {
      name: 'down and right',
      start: { x: 500, y: 0 },
      end: { x: 0, y: 200 },
    },
    {
      name: 'up and left',
      start: { x: 0, y: 200 },
      end: { x: 500, y: 0 },
    },
    {
      name: 'down and left',
      start: { x: 500, y: 200 },
      end: { x: 0, y: 0 },
    },
  ];
  describe('vertical', () => {
    directionCombinations.forEach((directionCombination) => {
      it(`should return the expected path for line going ${directionCombination.name}`, () => {
        const path = calculateAestheticLinePath({
          start: directionCombination.start,
          end: directionCombination.end,
          curviness: 0.5,
          orientation: LineOrientation.VERTICAL,
        });
        expect(path).not.toContain('-'); // should not have negatives
        expect(path).toMatchSnapshot();
      });
    });
  });
  describe('horizontal', () => {
    directionCombinations.forEach((directionCombination) => {
      it(`should return the expected path for line going ${directionCombination.name}`, () => {
        const path = calculateAestheticLinePath({
          start: directionCombination.start,
          end: directionCombination.end,
          curviness: 0.5,
          orientation: LineOrientation.HORIZONTAL,
        });
        expect(path).not.toContain('-'); // should not have negatives
        expect(path).toMatchSnapshot();
      });
    });
  });
});
