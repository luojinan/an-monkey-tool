import styles from "../../style.css?inline";

type MenuItem = {
  title: string;
  onClick?: () => void;
}

export function App() {

  const menuList: MenuItem[] = [
    {
      title: '功能入口',
      onClick: () => { }
    }, // 填写oss 信息，后存储到本地，支持上传
    { title: '功能入口' },
    { title: '功能入口' },
  ]

  return (
    <>
      <style>{styles}</style>
      <div className="drawer drawer-end" style={{ 'zIndex': 999 }}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="fixed right-2 bottom-5">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">✨🤖✨</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4 flex flex-row">
            {menuList.map((item, index) => (
              <li class="w-full sm:w-1/2" key={index} onClick={() => item?.onClick?.()}>
                <a>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div >
    </>
  );
}
