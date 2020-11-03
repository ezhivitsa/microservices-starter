import { block } from './bem';

describe('/lib/bevis/bevis', () => {
  it('should generate correct name of the class', () => {
    const b = block(
      {
        categoriesSelect: 'categories-select',
        categoriesSelect__headIco: 'categories-select__head-ico',
      },
      'categoriesSelect',
    );
    const className = b('headIco');

    expect(className).toEqual('categories-select__head-ico');
  });

  it('should generate correct class names when using state with a boolean value', () => {
    const b = block(
      {
        galleryImage: 'gallery-image',
        galleryImage__removeBtn: 'gallery-image__remove-btn',
        _active: '_active',
      },
      'gallery-image',
    );
    const className = b('removeBtn', { active: true });

    expect(className).toEqual('gallery-image__remove-btn _active');
  });

  it('should generate correct class names when using state with a string value', () => {
    const b = block(
      {
        searchBar: 'search-bar',
        searchBar__icon: 'search-bar__icon',
        _size_large: '_size_large',
      },
      'searchBar',
    );
    const className = b('icon', { size: 'large' });

    expect(className).toEqual('search-bar__icon _size_large');
  });
});
