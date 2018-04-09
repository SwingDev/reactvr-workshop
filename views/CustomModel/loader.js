import * as THREE from 'three';

const TEXTURE_CACHE = {};

const getUrl = value => (
  (value.uri) ? value.uri : value
);

const getCubeTextureLoader = (input) => {
  const isInputArray = Array.isArray(input);
  const parsed = (isInputArray) ? input.map(getUrl) : getUrl(input);
  const value = (isInputArray) ? parsed[0] : parsed;
  const ext = getUrl(value).split('.').pop();

  switch (ext) {
    default:
      return new THREE.CubeTextureLoader();
  }
};

const getCubeTexture = (key, value) => {
  const loader = getCubeTextureLoader(value);
  const urls = (Array.isArray(value)) ? value.map(getUrl) : getUrl(value);

  if (!TEXTURE_CACHE[urls]) {
    TEXTURE_CACHE[urls] = loader.load(urls);
  }

  return TEXTURE_CACHE[urls];
};

const setMaterialProp = (key, value, material) => {
  const materialProp = material[key];
  const isColor = (materialProp instanceof THREE.Color);
  const isVector = (materialProp instanceof THREE.Vector4) ||
    (materialProp instanceof THREE.Vector3);

  if (isColor) {
    material[key].set(value);
  } else if (isVector) {
    material[key].set(...value);
  } else {
    material[key] = value;
  }
};

class ModelLoader {
  constructor(url, parent) {
    this.url = url;
    this.parent = parent;
    this.materialProps = {};

    this.loader = new THREE.GLTFLoader();
    this.loader.load(this.url, this.handleLoad, () => {}, this.handleError);
  }

  update(newUrl) {
    if (newUrl !== this.url) {
      return false;
    }

    return true;
  }

  dispose() {
    if (this.object) {
      this.parent.remove(this.object);
      delete this.object;
    }
  }

  setMaterial(values) {
    if (this.object) {
      this.updateSceneMaterial(values);
    } else {
      this.materialProps = values;
    }
  }

  updateSceneMaterial(values) {
    this.object.traverse((node) => {
      if (node.isMesh) {
        if (values) {
          Object.keys(values).forEach((key) => {
            this.updateMaterialProp(key, values, node);
          });
        }
      }
    });
  }

  updateMaterialProp = (key, values, node) => {
    const value = values[key];

    switch (key) {
      case 'envMap':
        node.material[key] = getCubeTexture(key, value);
        break;

      case 'map':
      case 'normalMap':
      case 'emissiveMap':
      case 'metalnessMap':
      case 'roughnessMap':
      case 'aoMap':
        node.material[key] = new THREE.TextureLoader().load(getUrl(value));
        break;

      default:
        setMaterialProp(key, value, node.material);
        break;
    }

    node.material.needsUpdate = true;
  }

  handleLoad = (object) => {
    this.object = object.scene;

    this.updateSceneMaterial(this.materialProps);

    requestAnimationFrame(() => {
      this.parent.add(this.object);
    });
  };

  handleError = () => {
    console.error('failed to load OBJ', this.url);
  };
}

export const createModelInstance = (url, parent) => (
  new ModelLoader(url, parent)
);

