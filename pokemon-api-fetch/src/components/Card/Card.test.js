import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const mockPokemon = {
    name: 'pikachu',
    sprites: {
      other: {
        dream_world: {
          front_default: 'pikachu-image-url',
        },
      },
    },
    types: [
      { type: { name: 'electric' } },
      { type: { name: 'normal' } },
    ],
    weight: 60,
    height: 4,
    abilities: [{ ability: { name: 'static' } }],
  };

  const emptyPokemon = {
    name: '',
    sprites: {
      other: {
        dream_world: {
          front_default: '',
        },
      },
    },
    types: [
      { type: { name: '' } },
    ],
    weight: 0,
    height: 0,
    abilities: [{ ability: { name: '' } }],
  };

  test('renders the Card component', () => {
    const { container } = render(<Card pokemon={mockPokemon} />);
    expect(container).toBeInTheDocument();
  });

  test('renders the correct name', () => {
    const { getByText } = render(<Card pokemon={mockPokemon} />);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('renders the correct image', () => {
    const { getByAltText } = render(<Card pokemon={mockPokemon} />);
    expect(getByAltText('Pokemon')).toHaveAttribute(
      'src',
      'pikachu-image-url'
    );
  });

  test('renders the correct types', () => {
    const { getByText } = render(<Card pokemon={mockPokemon} />);
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Normal')).toBeInTheDocument();
  });

  test('renders the correct weight', () => {
    const { getByText } = render(<Card pokemon={mockPokemon} />);
    expect(getByText('Weight')).toBeInTheDocument();
    expect(getByText('60 kg')).toBeInTheDocument();
  });

  test('renders the correct height', () => {
    const { getByText } = render(<Card pokemon={mockPokemon} />);
    expect(getByText('Height')).toBeInTheDocument();
    expect(getByText('40 cm')).toBeInTheDocument();
  });

  test('renders the correct ability', () => {
    const { getByText } = render(<Card pokemon={mockPokemon} />);
    expect(getByText('Ability')).toBeInTheDocument();
    expect(getByText('Static')).toBeInTheDocument();
  });
});

// Now I want to create a test for when the pokemon prop is empty
