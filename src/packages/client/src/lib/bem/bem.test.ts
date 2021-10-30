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
        galleryImage__removeBtn_active: 'gallery-image__remove-btn_active',
      },
      'gallery-image',
    );
    const className = b('removeBtn', { active: true });

    expect(className).toEqual('gallery-image__remove-btn gallery-image__remove-btn_active');
  });

  it('should generate correct class names when using state with a string value', () => {
    const b = block(
      {
        searchBar: 'search-bar',
        searchBar__icon: 'search-bar__icon',
        searchBar__icon_size_large: 'search-bar__icon_size_large',
      },
      'searchBar',
    );
    const className = b('icon', { size: 'large' });

    expect(className).toEqual('search-bar__icon search-bar__icon_size_large');
  });
});
