/**导入 Components 工具类*/
import Components from './components';
import IconSelector from './IconSelector';
import ImgModal from './ImgModal';
const components = {
  IconSelector,
  ImgModal
};

/**创建一个 Components 类 传入 组件列表*/
const comp = new Components(components);
const PublicComponents = comp.install();
/**暴露接口*/
export default PublicComponents;
