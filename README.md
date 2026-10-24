# 赵嘉程 · 个人主页（GitHub Pages）

一个零依赖的静态个人主页（简历 / 作品集单页），只用 HTML + CSS + 原生 JS 写成。
深色模式、移动端适配、滚动动画、简历下载都已内置，不需要安装任何工具、不需要构建。

**上线后的地址：** <https://gomang24.github.io>

---

## 一、文件结构

```
github-pages-site/
├── index.html              ← 页面内容都在这里（改文字主要改这个）
├── assets/
│   ├── css/style.css       ← 全部样式、配色、响应式
│   ├── js/main.js          ← 主题切换、菜单、滚动动画、复制邮箱
│   ├── avatar.svg          ← 头像（可直接替换成自己的照片）
│   ├── favicon.svg         ← 浏览器标签页小图标
│   └── resume.pdf          ← 简历 PDF，页面上的「下载简历」指向它
├── .nojekyll               ← 告诉 GitHub 不要用 Jekyll 处理，别删
└── README.md               ← 本说明
```

## 二、先在本地看一眼

直接双击 `index.html` 用浏览器打开即可，不需要服务器。
想模拟真实线上环境，可以在本目录执行：

```powershell
python -m http.server 8000
```

然后访问 <http://localhost:8000>。

---

## 三、部署到 GitHub（约 5 分钟）

### 第 1 步：推送代码

仓库已经建好，本地也关联了 `origin`（`https://github.com/Gomang24/Gomang24.github.io.git`），
在 PowerShell 里执行：

```powershell
cd E:\workspace\github-pages-site
git add .
git commit -m "feat: 按简历更新个人主页"
git push
```

换电脑或重新克隆时，用：

```powershell
git clone https://github.com/Gomang24/Gomang24.github.io.git
```

第一次推送会弹窗要求登录 GitHub，选 **Sign in with your browser** 授权即可，不需要配 SSH key 或 token。

### 第 2 步：确认 Pages 已开启

1. 打开 **https://github.com/Gomang24/Gomang24.github.io/settings/pages**
2. **Source** 选 `Deploy from a branch`
3. **Branch** 选 `main`，目录选 `/ (root)` → **Save**
4. 页面顶部出现 "Your site is live at https://gomang24.github.io/" 就说明好了

> 仓库名是 `用户名.github.io` 时 GitHub 通常会自动开启；如果已经显示 live，这一步直接跳过。

### 第 3 步：访问

等 1～3 分钟（首次部署稍慢），打开：

```
https://gomang24.github.io
```

部署状态可以在仓库的 **Actions** 或 **Settings → Pages** 里看，绿色对勾即成功。

### 第 4 步：以后怎么更新

改完文件后：

```powershell
git add .
git commit -m "更新内容"
git push
```

1 分钟左右线上自动刷新；浏览器记得按 `Ctrl + F5` 强制刷新，避免看到缓存。

> 想换成别的账号或仓库：`git remote set-url origin <新仓库地址>`，再到新仓库的 Settings → Pages 重新开启一次。

---

## 四、网站内容说明（已按简历填好）

页面上的信息来自 `assets/resume.pdf`，已替换成赵嘉程的版本。以后要改，打开 `index.html`，
按下面的对照表搜索替换即可（建议用 VS Code，`Ctrl + H` 批量替换）。

| 内容 | 在文件里搜索 | 说明 |
| --- | --- | --- |
| 姓名 | `赵嘉程` | 标题、导航、页脚、名片等多处，全部替换 |
| 头像首字母 | `>Z<` | 在 `assets/avatar.svg` 里，改成你名字拼音首字母 |
| 头衔 | `嵌入式软件工程师` | `<title>`、Hero 标题、og 标签 |
| 一句话介绍 | `做过量子随机数设备的 SDK` | Hero 区域的大段文案 |
| 邮箱 | `307782393@qq.com` | 2 处 `mailto:` 链接（Hero 图标、联系卡片） |
| 电话 | — | 页面上已移除（简历 PDF 里仍保留），需要加回来时照抄其他 `contact-row` 即可 |
| 所在地 | `陕西 · 西安` | 名片与联系区块 |
| 统计数据 | `1.5年` `4+` `800亿` | 名片右侧的三个数字 |
| 技能标签 | `<li class="chip">` | 增删即可，样式自动换行 |
| 项目 | `<article class="project-card">` | 三个项目卡片，可复制或删除 |
| 补充项目 | `class="project-note"` | 项目区底部那段「除此之外还参与过」 |
| 经历 | `<li class="timeline-item">` | 工作与教育，按时间倒序 |
| 页面描述 | `content="赵嘉程的个人主页` | SEO 与分享卡片描述 |

**简历下载**：`assets/resume.pdf` 已就位，Hero 的「下载简历」按钮和联系卡片都指向它；
换新简历时直接覆盖这个文件即可，文件名保持不变就不用改代码。

> ⚠️ 邮箱会公开在互联网上（GitHub Pages 是公开站点，搜索引擎也可能收录）。
> 页面上已经没有手机号了，但 **`assets/resume.pdf` 里仍有电话**——它是谁都能点开下载的公开文件，
> 介意的话请用不含电话的版本覆盖它。

**换成自己的照片当头像**：把照片裁成正方形（建议 400×400 以上），命名为 `avatar.jpg` 放进 `assets/`，
然后把 `index.html` 里的 `src="assets/avatar.svg"` 改成 `src="assets/avatar.jpg"`。

---

## 五、可选进阶

### 1. 绑定自己的域名（如 `zhangsan.com`）

1. 在域名服务商处添加解析：
   - `A` 记录 → `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - `CNAME` 记录（`www` 子域）→ `你的用户名.github.io`
2. 仓库 **Settings → Pages → Custom domain** 填入域名并保存
3. 勾选 **Enforce HTTPS**（证书签发可能要等几分钟到几小时）

GitHub 会在仓库根目录自动生成 `CNAME` 文件，**不要删它**。

### 2. 加访问统计

在 `</body>` 前贴一段 [Google Analytics](https://analytics.google.com/) 或 [Umami](https://umami.is/) 的脚本即可。
不想被追踪的话也可以跳过。

### 3. 换配色

`assets/css/style.css` 顶部第 1 节是全部颜色变量，改 `--accent`（主色）和 `--accent-2`（辅助色）就能整站换色，
深色模式对应 `html[data-theme="dark"]` 里的同名变量。

---

## 六、常见问题

**打开是 404？**
① 仓库名必须严格等于 `用户名.github.io`；② 文件必须在仓库**根目录**（`index.html` 不能套在子文件夹里）；
③ 分支必须是 `main` 且目录为 `/ (root)`；④ 首次部署要等 1～3 分钟。

**页面能打开但没有样式？**
`assets` 文件夹没有一起上传，或路径大小写不一致（Linux 服务器区分大小写）。
确认仓库根目录能看到 `assets/css/style.css`。

**改了内容线上没变化？**
先等 1 分钟，再 `Ctrl + F5`。仍无变化就去 **Actions** 看构建是否失败。

**国内访问很慢或打不开？**
GitHub Pages 的域名在国内偶发不稳定，属于网络问题而非配置问题。
可选方案：绑定自己的域名并接入 Cloudflare 免费 CDN，通常能明显改善。

**一个账号能有几个站点？**
用户站点（`用户名.github.io`）只有一个；但可以再建普通仓库做「项目站点」，
地址是 `用户名.github.io/仓库名`，同一套文件直接复用即可。

**想删除站点？**
删除仓库，或在 **Settings → Pages** 里把 Source 设为 `None`。

---

## 七、技术说明

- 无框架、无构建、无外部 CDN 依赖，离线可用，首屏只有 3 个本地请求
- 语义化标签 + `aria` 属性 + 键盘可访问 + `prefers-reduced-motion` 适配
- 主题偏好保存在 `localStorage`，刷新不闪白
- 已针对 320px～1920px 宽度和打印样式做适配

内容基于 `assets/resume.pdf` 整理，更新简历时记得同步修改页面文案。
