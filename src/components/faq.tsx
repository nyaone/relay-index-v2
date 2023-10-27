import { Disclosure, Transition } from "@headlessui/react";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

const faqs = [
  {
    question: "提示加入失败或者加入状态一直没有更新，我应该怎么做？",
    answer: (
      <>
        一般来讲，只要申请加入就会自动通过，但有时由于各种奇奇怪怪的原因导致不能立刻刷新出状态时，您可以尝试退出再加入。
        <br />
        如果重试多次之后还是没有成功，您可以{" "}
        <a
          href="https://docs.nya.one/contact/"
          target="_blank"
          className="text-primary font-semibold"
        >
          联系我们
        </a>{" "}
        一起协助排查错误。
        <br />
        出于各种未知的原因，我们无法保证 100% 解决问题，但我们会尽全力协助您。
      </>
    ),
  },
  {
    question: "这个中继使用的后端和兼容的软件？",
    answer: (
      <>
        是{" "}
        <a
          href="https://github.com/yukimochi/Activity-Relay"
          target="_blank"
          className="text-primary hover:text-sky-500 transition-colors duration-300"
        >
          yukimochi/Activity-Relay
        </a>{" "}
        ，目前已经测试在 Misskey 、 FireFish (Calckey) 、 Mastodon 和 Pleroma
        上的兼容性，对其他软件的支持程度受相关的软件影响，有时可能未必能获得理想的体验。
        <br />
        如果您有关于软件的任何疑问，推荐您直接在 GitHub 仓库里提出一个 issue 。
      </>
    ),
  },
  {
    question: "为什么实例列表是杂乱显示的，每次刷新数据都会不一样？",
    answer: (
      <>
        是故意这样的。
        <br />
        我们使用的检测工具是使用 Go 语言开发的，其自带的 json 包会在格式化 JSON
        数据时，将 Key - Value 数据会依据 Key
        的字典序进行排序。因而在我们的结果格式中，使用默认数据会导致域名字典序靠前的实例获得更多的展示机会；
        <br />
        如果使用其他依据进行排序，则会因为各种可能出现的针对性优化问题从而导致数据有失偏颇。
        <br />
        所以就使用了众生平等的随机排序方式。
        <br />
        如果您是实例站长，想查看您的实例是否成功加入中继，您可以使用浏览器自带的「网页搜索」功能。
      </>
    ),
  },
  {
    question: "为什么就 Mastodon 不会显示实例名称和介绍？",
    answer: (
      <>
        实例的名称和介绍是从 NodeInfo 的 metadata 中截取的 nodeName 和
        nodeDescription 。 mastodon 没有提供这两个字段（ mastodon 的整个
        metadata 字段都是空的）。
        <br />
        不是针对什么实例或软件的意思。
      </>
    ),
  },
  {
    question: "这列表里提供的用户和帖文统计数据是否准确？",
    answer: (
      <>
        不确定，这两个数据也是从 NodeInfo
        中提取出来的，如果软件被修改过从而提供了假信息的话，我们也无从考证。
        <br />
        所以这个仅供参考，毕竟没有人能保证数据好看的实例体验就一定好。
      </>
    ),
  },
  {
    question: "一些实例的显示状态是异常的，请问判断依据是？",
    answer: (
      <>
        我们根据能否请求到实例对应的节点信息端点 ( /.well-known/nodeinfo )
        ，并从中找到的符合 http://nodeinfo.diaspora.software/ns/schema/2.x
        规范的端点，拉取实例信息来进行粗略的状态检查。
        <br />
        <span className="ml-4 flex flex-row items-center">
          <XCircleIcon className="w-6 h-6 text-red-500" />{" "}
          对于一些严重异常的实例，例如域名无法解析或域名失能（无法响应 HTTP
          请求的），会被标记为红色的错误标记
        </span>
        <span className="ml-4 flex flex-row items-center">
          <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />{" "}
          对于一些一般异常的实例，例如 NodeInfo
          响应无效或结构无效，会被标记为黄色的警示标记
        </span>
        <span className="ml-4 flex flex-row items-center">
          <CheckCircleIcon className="w-6 h-6 text-green-500" />{" "}
          对于能正常请求到并解析数据的实例，则会被标记为正常运行的。
        </span>
        但请注意
        <span className="font-extrabold underline decoration-wavy">
          这只是一个参考
        </span>{" "}
        ——
        我们并不能保证状态为警示的实例就一定工作异常，状态为正常的实例就一定没有问题。
        <br />
        例如，一些实例因为使用了 CloudFlare
        做保护，但并没有关闭针对机器人的防护选项（或者开启了更严格的防护措施），导致请求被人机验证拦截下来了，就会导致响应代码出现异常，但实例本身是在正常工作的。
        <br />
        出于普适性考虑，我们在抓取节点信息时<b>不会</b>伪造包括但不仅限于 User
        Agent 的浏览器指纹数据。
      </>
    ),
  },
  {
    question: "异常实例的持续时间是否准确？",
    answer: (
      <>
        不准确。这个时间的意思是从检测工具「发现」实例存在异常开始计算的连续时间，因为检测工具的上线时间较晚，检测间隔较长（10
        分钟一次），所以时间会少于实例实际发生异常的时间。
        <br />
        可以理解为这是实例至少持续这么长时间都出现了错误。
      </>
    ),
  },
  {
    question: "加入之后的实例会有被移除的可能性吗？",
    answer: (
      <>
        会有的。目前的设计中有两种移除的依据，一种是因「实例失效」被移除，另一种是因「内容违反我们的服务器所在地规约」（以下简称「内容违规」）被移除。
        <br />
        「实例失效」指的是当实例处于{" "}
        <span className="text-red-500">错误状态</span> 超过 <b>30 天</b>{" "}
        ；或者处于 <span className="text-yellow-500">异常状态</span> 超过{" "}
        <b>90 天</b> 且经过人工审核确认实例不再有效。
        <br />
        「内容违规」的判断基于我们主站 喵窝
        的内容与审核政策，在主站与某些实例（例如存在侵犯隐私或是可能违规内容）断开互联时同步移除可能已经加入中继的对应实例。
        <br />
        特别地，如果是因「实例失效」移除的实例，请不用担心，您可以在实例功能恢复（请确保用户私钥同时恢复）时再手动重新加入中继；如果是因「内容违规」被移除的实例，则会被中继拒绝再次加入。
      </>
    ),
  },
  {
    question: "一些实例的介绍看上去就是 HTML ，可以格式化一下使它更美观吗？",
    answer: (
      <>
        不可以。这是出于安全的考虑，如果站点介绍中存在一些 HTML
        注入的恶意脚本，贸然格式化或是处理会导致访问这个页面的用户遭受不可预计的损失。
      </>
    ),
  },
  {
    question: "能提供中继的实时运行日志吗？",
    answer: (
      <>
        暂时没有，或许未来会有吧。
        <br />
        如果您有辅助调试的需求，请放心大胆地{" "}
        <a
          href="https://docs.nya.one/contact/"
          target="_blank"
          className="text-primary font-semibold"
        >
          联系我们
        </a>
        。
      </>
    ),
  },
];

const FAQ = () => {
  return (
    <div id="faq">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:pb-40">
        <div className="mx-auto divide-y divide-gray-900/10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-base font-semibold leading-7 text-primary">
              FAQs
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              常见问题
            </h2>
          </div>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <PlusSmallIcon
                            className={`h-6 w-6 transition-transform duration-300 ${
                              open ? "rotate-45" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform h-0 opacity-0"
                      enterTo="transform h-full opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform h-full opacity-100"
                      leaveTo="transform h-0 opacity-0"
                    >
                      <Disclosure.Panel as="dd" className="pr-12 pt-2">
                        <p className="text-base leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
