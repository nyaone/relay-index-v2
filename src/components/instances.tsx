import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { type PropsWithChildren, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { printRoughTime } from "../utils/printRoughTime.ts";
import { strMaxLen } from "../utils/strMaxLen.ts";

const InstanceTableWrapper = ({ children }: PropsWithChildren) => (
  <div className="flow-root">
    <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg max-h-[calc(100vh-20em)] overflow-auto">
      <table className="min-w-full divide-y divide-gray-300">{children}</table>
    </div>
  </div>
);

const commonStyle = "text-left text-sm font-semibold";

const thCommonStyle = `text-gray-900 px-3 py-3.5 whitespace-nowrap ${commonStyle}`;
const th1Style = `pl-4 pr-3 sm:pl-6 ${thCommonStyle}`;
const trCommonStyle = `text-gray-500 px-3 py-4 ${commonStyle}`;

const InstanceTableHeader = () => (
  <thead className="bg-gray-100 sticky top-0">
    <tr>
      <th scope="col" className={th1Style}>
        实例
      </th>
      <th scope="col" className={thCommonStyle}>
        状态
      </th>
      <th scope="col" className={thCommonStyle}>
        介绍
      </th>
      <th scope="col" className={thCommonStyle}>
        软件
      </th>
      <th scope="col" className={thCommonStyle}>
        用户数
      </th>
      <th scope="col" className={thCommonStyle}>
        帖文数
      </th>
    </tr>
  </thead>
);

type InstanceStatus = "OK" | "Warn" | "Error";

type InstanceInfo = {
  domain: string;
  status: InstanceStatus;
  // Base info
  name?: string;
  description: string;
  openRegistrations?: boolean;
  software?: {
    name: string;
    version?: string;
  };
  usersCount?: number;
  notesCount?: number;
};

type InstanceCount = {
  ok: number;
  warn: number;
  error: number;
};

interface VisibilityToggleProps {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
  color: {
    visible: string;
    invisible: string;
  };
  icon: ReactNode;
}
const VisibilityToggle = ({
  isVisible,
  setVisible,
  color,
  icon,
}: VisibilityToggleProps) => (
  <button
    type="button"
    className={`flex rounded-full p-2 text-center text-white shadow-sm transition-colors duration-300 ${
      isVisible ? color.visible : color.invisible
    }`}
    onClick={() => {
      setVisible(!isVisible);
    }}
  >
    {icon}
  </button>
);

interface ControlButtonsProps {
  isShowOKInstances: boolean;
  setShowOKInstances: (state: boolean) => void;
  isShowWarnInstances: boolean;
  setShowWarnInstances: (state: boolean) => void;
  isShowErrorInstances: boolean;
  setShowErrorInstances: (state: boolean) => void;

  isLoading: boolean;
  loadInstanceList: (manualRefresh: boolean) => void;
}
const ControlButtons = ({
  isShowOKInstances,
  setShowOKInstances,
  isShowWarnInstances,
  setShowWarnInstances,
  isShowErrorInstances,
  setShowErrorInstances,

  isLoading,
  loadInstanceList,
}: ControlButtonsProps) => (
  <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row gap-4 items-center">
    <div className="flex flex-row gap-1 w-full h-full">
      <VisibilityToggle
        isVisible={isShowOKInstances}
        setVisible={setShowOKInstances}
        color={{
          visible: "bg-green-500 hover:bg-green-600",
          invisible: "bg-gray-400  hover:bg-gray-500",
        }}
        icon={<CheckCircleIcon className="h-5 w-5" />}
      />
      <VisibilityToggle
        isVisible={isShowWarnInstances}
        setVisible={setShowWarnInstances}
        color={{
          visible: "bg-yellow-500 hover:bg-yellow-600",
          invisible: "bg-gray-400  hover:bg-gray-500",
        }}
        icon={<ExclamationCircleIcon className="h-5 w-5" />}
      />
      <VisibilityToggle
        isVisible={isShowErrorInstances}
        setVisible={setShowErrorInstances}
        color={{
          visible: "bg-red-500 hover:bg-red-600",
          invisible: "bg-gray-400  hover:bg-gray-500",
        }}
        icon={<XCircleIcon className="h-5 w-5" />}
      />
    </div>
    <button
      type="button"
      className="block rounded-md bg-primary p-3 text-center text-white shadow-sm hover:bg-sky-500 transition-colors duration-300"
      onClick={() => {
        loadInstanceList(true);
      }}
      disabled={isLoading}
    >
      <ArrowPathIcon className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
    </button>
  </div>
);

interface InstancesSummaryTimeProps {
  lastUpdateTime: Date;
}
const InstancesSummaryTime = ({
  lastUpdateTime,
}: InstancesSummaryTimeProps) => (
  <div className="mt-2 text-sm flex flex-row items-center gap-1">
    <ClockIcon className="w-5 h-5 text-primary" />
    <p className="text-gray-600 font-semibold">
      列表每 10 分钟自动更新一次，上次更新为{" "}
      <time title={lastUpdateTime.toString()} className="text-primary">
        {printRoughTime(lastUpdateTime)}
      </time>{" "}
      前。
    </p>
  </div>
);

interface InstancesSummaryCounterProps {
  instanceCount: InstanceCount;
}
const InstancesSummaryCounter = ({
  instanceCount,
}: InstancesSummaryCounterProps) => (
  <div className="mt-2 text-sm flex flex-row items-center gap-1">
    <SparklesIcon className="w-5 h-5 text-primary" />
    <p className="text-gray-600 font-semibold">
      当前共有{" "}
      <span className="text-primary">
        {instanceCount.ok + instanceCount.warn + instanceCount.error}
      </span>{" "}
      ({" "}
      <span className="text-green-500" title="正常">
        {instanceCount.ok}
      </span>{" "}
      /{" "}
      <span className="text-yellow-500" title="警告">
        {instanceCount.warn}
      </span>{" "}
      /{" "}
      <span className="text-red-500" title="错误">
        {instanceCount.error}
      </span>{" "}
      ) 个实例。
    </p>
  </div>
);

interface InstancesSummaryProps {
  lastUpdateTime: Date;
  instanceCount: InstanceCount;
}
const InstancesSummary = ({
  lastUpdateTime,
  instanceCount,
}: InstancesSummaryProps) => (
  <div className="sm:flex-auto">
    <InstancesSummaryTime lastUpdateTime={lastUpdateTime} />
    <InstancesSummaryCounter instanceCount={instanceCount} />
  </div>
);

interface InstanceTableBodyProps {
  instanceList: InstanceInfo[];
}
const InstanceTableBody = ({ instanceList }: InstanceTableBodyProps) => (
  <tbody className="divide-y divide-gray-200">
    {instanceList.map((instance) => (
      <tr
        key={instance.domain}
        className="bg-gray-100 bg-opacity-0 hover:bg-opacity-100 transition-colors duration-300 cursor-pointer"
        onClick={() => {
          try {
            navigator.clipboard.writeText(instance.domain);
            toast(
              `实例 ${
                instance.name || instance.domain
              } 的链接已经放到您的剪贴板里啦`,
              { icon: "🎉" },
            );
          } catch (e) {
            toast("我们很想和你分享这个实例的域名，但剪贴板拒绝了我们的写入", {
              icon: "😭",
            });
            console.log(e);
          }
        }}
      >
        <td className={`pl-4 pr-3 font-medium sm:pl-6 ${trCommonStyle}`}>
          {/*实例*/}
          <div className="flex flex-row gap-2 items-center">
            {/*<div className="w-6 h-6 flex-shrink-0">*/}
            {/*  <img className="w-6 h-6" src={`https://${instance.domain}/favicon.ico`} alt={instance.domain} />*/}
            {/*</div>*/}
            <div>
              {instance.name ? (
                <div className="flex flex-col">
                  <span>{instance.name}</span>
                  <span className="text-xs text-gray-400">
                    {instance.domain}
                  </span>
                </div>
              ) : (
                <span>{instance.domain}</span>
              )}
            </div>
          </div>
        </td>
        <td className={trCommonStyle}>
          {/*状态*/}
          <div className="pr-6">
            {instance.status === "OK" && (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            )}
            {instance.status === "Warn" && (
              <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
            )}
            {instance.status === "Error" && (
              <XCircleIcon className="w-6 h-6 text-red-500" />
            )}
          </div>
        </td>
        <td className={trCommonStyle}>
          {/*介绍*/}
          <p title={instance.description} className="line-clamp-2">
            {instance.description}
          </p>
        </td>
        <td className={`${trCommonStyle} flex flex-col`}>
          {/*软件*/}
          <span className="capitalize">{instance.software?.name}</span>
          {instance.software?.version && (
            <span
              className="text-xs text-gray-400"
              title={instance.software.version}
            >
              {strMaxLen(instance.software.version, 16)}
            </span>
          )}
        </td>
        <td className={trCommonStyle}>
          {/*用户数*/}
          {instance.usersCount}
        </td>
        <td className={trCommonStyle}>
          {/*帖文数*/}
          {instance.notesCount}
        </td>
      </tr>
    ))}
  </tbody>
);

const InstancesTable = () => {
  // Variables
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isLoading, setLoading] = useState(true);
  const [instanceList, setInstanceList] = useState<InstanceInfo[]>([]);
  const [instanceCount, setInstanceCount] = useState<InstanceCount>({
    ok: 0,
    warn: 0,
    error: 0,
  });
  const [isShowOKInstances, setShowOKInstances] = useState(true);
  const [isShowWarnInstances, setShowWarnInstances] = useState(true);
  const [isShowErrorInstances, setShowErrorInstances] = useState(true);

  // Handlers
  const loadInstanceList = async (manualRefresh: boolean = false) => {
    setLoading(true);

    // Load domains.json
    let instanceStatusList;
    try {
      instanceStatusList = await fetch(
        `./domains.json?ts=${new Date().getTime()}`,
      ).then((res) => res.json());

      if (manualRefresh) {
        toast.success("实例列表拉取成功，正在更新...");
      }
    } catch (e) {
      toast.error("哎呀，实例列表拉取失败了。");
      console.log(e);
    }

    // Parse last update
    setLastUpdateTime(new Date(instanceStatusList.collected_at));

    // Parse instance list
    const instanceListPrepare: InstanceInfo[] = [];

    for (const [domain, validInstance] of Object.entries(
      instanceStatusList.valid,
    )) {
      /* eslint-disable */
      instanceListPrepare.push({
        domain: domain,
        status: "OK",
        name: (validInstance as any).metadata?.nodeName,
        description: (validInstance as any).metadata?.nodeDescription || "",
        openRegistrations: (validInstance as any).openRegistrations,
        software: (validInstance as any).software
          ? {
              name: (validInstance as any).software.name,
              version: (validInstance as any).software.version,
            }
          : {
              name: "未知",
            },
        usersCount: (validInstance as any).usage?.users?.total,
        notesCount: (validInstance as any).usage?.localPosts,
      });
      /* eslint-enable */
    }
    const instanceCountOK = instanceListPrepare.length;

    for (const [domain, since] of Object.entries(
      instanceStatusList.misformatted_nodeinfo_schema,
    )) {
      /* eslint-disable */
      instanceListPrepare.push({
        domain: domain,
        status: "Warn",
        description: "NodeInfo 结构无效",
        software: {
          name: "问题已持续",
          version: printRoughTime(new Date(since as string)),
        },
      });
      /* eslint-enable */
    }

    for (const [domain, since] of Object.entries(
      instanceStatusList.misformatted_nodeinfo_list,
    )) {
      /* eslint-disable */
      instanceListPrepare.push({
        domain: domain,
        status: "Warn",
        description: "未找到可解析的 NodeInfo 结构",
        software: {
          name: "问题已持续",
          version: printRoughTime(new Date(since as string)),
        },
      });
      /* eslint-enable */
    }

    for (const [domain, details] of Object.entries(
      instanceStatusList.wrong_code,
    )) {
      /* eslint-disable */
      instanceListPrepare.push({
        domain: domain,
        status: "Warn",
        description: `NodeInfo 响应代码无效: ${String((details as any).code)}`,
        software: {
          name: "问题已持续",
          version: printRoughTime(new Date((details as any).since)),
        },
      });
      /* eslint-enable */
    }
    const instanceCountWarn = instanceListPrepare.length - instanceCountOK;

    for (const [domain, since] of Object.entries(
      instanceStatusList.not_functioning,
    )) {
      /* eslint-disable */
      instanceListPrepare.push({
        domain: domain,
        status: "Error",
        description: "域名失能",
        software: {
          name: "问题已持续",
          version: printRoughTime(new Date(since as string)),
        },
      });
      /* eslint-enable */
    }

    for (const [domain, since] of Object.entries(
      instanceStatusList.unresolved,
    )) {
      /* eslint-disable */
      instanceListPrepare.push({
        domain: domain,
        status: "Error",
        description: "域名无法解析",
        software: {
          name: "问题已持续",
          version: printRoughTime(new Date(since as string)),
        },
      });
      /* eslint-enable */
    }
    const instanceCountError =
      instanceListPrepare.length - instanceCountWarn - instanceCountOK;

    setInstanceCount({
      ok: instanceCountOK,
      warn: instanceCountWarn,
      error: instanceCountError,
    });

    // Randomize
    const instanceListRandom: InstanceInfo[] = [];
    while (instanceListPrepare.length > 0) {
      instanceListRandom.push(
        ...instanceListPrepare.splice(
          Math.floor(Math.random() * instanceListPrepare.length),
          1,
        ),
      );
    }

    setInstanceList(instanceListRandom);
    setLoading(false);
  };

  // Initialize
  useEffect(() => {
    loadInstanceList();
  }, []);

  // Main
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <InstancesSummary
          lastUpdateTime={lastUpdateTime}
          instanceCount={instanceCount}
        />
        <ControlButtons
          isShowOKInstances={isShowOKInstances}
          setShowOKInstances={setShowOKInstances}
          isShowWarnInstances={isShowWarnInstances}
          setShowWarnInstances={setShowWarnInstances}
          isShowErrorInstances={isShowErrorInstances}
          setShowErrorInstances={setShowErrorInstances}
          isLoading={isLoading}
          loadInstanceList={loadInstanceList}
        />
      </div>
      <div className="mt-4 max-h-full border-primary border-2 rounded-md">
        <InstanceTableWrapper>
          <InstanceTableHeader />
          <InstanceTableBody
            instanceList={instanceList.filter(
              (instance) =>
                (isShowOKInstances && instance.status === "OK") ||
                (isShowWarnInstances && instance.status === "Warn") ||
                (isShowErrorInstances && instance.status === "Error"),
            )}
          />
        </InstanceTableWrapper>
      </div>
    </div>
  );
};

const Instances = () => (
  <div id="instances">
    <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:pb-40">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-base font-semibold leading-7 text-primary">
          Instances
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          实例列表
        </h2>
      </div>

      <InstancesTable />
    </div>
  </div>
);

export default Instances;
