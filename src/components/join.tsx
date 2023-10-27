import { ArrowRightIcon, LinkIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { ReactNode } from "react";

const methods = [
  {
    id: "supports-relay",
    name: "中继协议方式",
    href: "https://relay.nya.one/inbox",
    description:
      "例如 Misskey 、 FireFish 、 Mastodon ，可以在实例的控制台里添加中继订阅。",
    flow: [
      "点击下面的「复制链接」按钮",
      <>
        或者复制这个链接：
        <span className="select-all">https://relay.nya.one/inbox</span>
      </>,
      "进入实例控制台的中继管理区域",
      "添加中继，粘贴并确认",
      "稍等一会刷新管理区域，检查中继状态",
    ],
    linkid: "inbox",
  },
  {
    id: "supports-actor",
    name: "订阅用户方式",
    href: "https://relay.nya.one/actor",
    description:
      "例如 Pleroma ，没有专门的中继协议支持，但可以实例级关注一个外站用户。",
    flow: [
      "点击下面的「复制链接」按钮",
      <>
        或者复制这个链接：
        <span className="select-all">https://relay.nya.one/actor</span>
      </>,
      "使用相对应的指令执行关注操作",
    ],
    linkid: "actor",
  },
];

interface MethodCardProps {
  id: string;
  name: string;
  description: string;
  flow: (string | ReactNode)[];
  href: string;
  linkid: string;
}
const MethodCard = ({
  id,
  name,
  description,
  flow,
  href,
  linkid,
}: MethodCardProps) => (
  <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
    <div>
      <div className="mt-4 items-baseline">
        <h3 className="text-5xl font-bold tracking-tight text-primary text-center">
          {name}
        </h3>
      </div>
      <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
      <ul
        role="list"
        className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
      >
        {flow.map((step, index) => (
          <li key={index} className="flex gap-x-3">
            <ArrowRightIcon
              className="h-6 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            {step}
          </li>
        ))}
      </ul>
    </div>
    <button
      onClick={() => {
        navigator.clipboard
          .writeText(href)
          .then(() => {
            toast.success("复制成功～");
          })
          .catch((e) => {
            toast.error("复制失败，您可能要手动复制啦");
            console.log(e);
          });
      }}
      aria-describedby={id}
      className="mt-8 flex flex-row gap-1 justify-center rounded-md bg-primary px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-colors duration-300"
    >
      <LinkIcon className="h-6 w-5 flex" aria-hidden="true" />
      <span>复制 {linkid} 链接</span>
    </button>
  </div>
);

const Join = () => (
  <div id="join" className="isolate overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-4xl">
        <span className="text-base font-semibold leading-7 text-primary">
          Join Us
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          加入我们
        </h2>
      </div>
    </div>
    <div className="flow-root bg-white pb-24 sm:pb-32">
      <div className="-mt-80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
            {methods.map((method) => (
              <MethodCard
                key={method.id}
                id={method.id}
                name={method.name}
                description={method.description}
                flow={method.flow}
                href={method.href}
                linkid={method.linkid}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Join;
