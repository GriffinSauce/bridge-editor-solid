import type { Component } from "solid-js";
import { device, connected, disconnect } from "../services/device";

const links = [
	{ href: "https://github.com/GriffinSauce/bridge-editor", label: "GitHub" },
];

const Navigation: Component = () => {
	return (
		<nav class="navbar bg-base-200">
			<div class="flex-1">
				<a href="/" class="text-lg normal-case btn btn-ghost">
					Bridge Editor
				</a>

				<div class="flex items-center justify-center py-2 text-xs text-gray-500">
					<a
						href="https://github.com/GriffinSauce/pirate-midi-usb"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by&nbsp;
						<span class="font-semibold">pirate-midi-usb</span>
					</a>
				</div>
			</div>

			<div class="flex-none">
				<ul class="p-0 space-x-1 menu menu-horizontal">
					{device() && connected() ? (
						<li>
							<button class="text-xs btn" onClick={disconnect}>
								Disconnect
							</button>
						</li>
					) : null}

					{links.map(({ href, label }) => (
						<li>
							<a href={href} target="_blank" rel="noopener noreferrer">
								{label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
