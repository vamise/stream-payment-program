import {
    STREAM_STATUS_CANCELED,
    STREAM_STATUS_COMPLETE,
    STREAM_STATUS_SCHEDULED,
    STREAM_STATUS_STREAMING
} from "../constants/constants";
import {clusterApiUrl, PublicKey} from "@solana/web3.js";
import {getUnixTime} from "date-fns";
import swal from "sweetalert";

export function getDecodedAccountData(buffer: Buffer) {
    const start = buffer.readBigUInt64LE(0);
    const end = buffer.readBigUInt64LE(8);
    const amount = buffer.readBigUInt64LE(16);
    const withdrawn = Number(buffer.readBigUInt64LE(24));
    const sender = (new PublicKey(buffer.slice(32, 64))).toBase58();
    const recipient = (new PublicKey(buffer.slice(64, 96))).toBase58();
    const status = getStreamStatus(Number(start), Number(end), getUnixTime(new Date())) //in milliseconds

    return new StreamData(sender, recipient, amount, start, end, withdrawn, status);
}

export function getExplorerLink(type: string, id: string, network?: string): string {
    network = network || clusterApiUrl('mainnet-beta');
    return `https://explorer.solana.com/${type}/${id}?cluster=custom&customUrl=${network}`;

}

export function getStreamStatus(start: number, end: number, now: number) {
    if (now < start) {
        return STREAM_STATUS_SCHEDULED
    } else if (now < end) {
        return STREAM_STATUS_STREAMING
    } else {
        return STREAM_STATUS_COMPLETE
    }
}

export function StreamData(sender: string, receiver: string, amount: number, start: number, end: number, withdrawn?: number, status?: string, canceled_at: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.start = start;
    this.end = end;
    this.withdrawn = withdrawn || 0;
    this.status = canceled_at ? STREAM_STATUS_CANCELED : (status || STREAM_STATUS_SCHEDULED);
    this.canceled_at = canceled_at;
}

export function _swal(): Promise {
    return swal({text: "Are you sure?", icon: "warning", buttons: true})
}

export function copyToClipboard(value): void {
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function streamCreated(id: string) {
    const url = window.location.origin + "/" + id;
    swal({
        button: "Copy Stream URL",
        icon: 'success',
        title: "Stream created!",
        //sweet alert accepts pure HTML Node, so some wrapping must be done https://sweetalert.js.org/guides/#using-dom-nodes-as-content
        content:
            {
                element: "a",
                attributes: {
                    className: "text-primary block truncate max-w-full",
                    href: url,
                    target: "_blank",
                    innerHTML: url
                }
            }
    }).then((clicked) => {
        if (clicked) {
            copyToClipboard(url);
            swal("Link copied to clipboard!", "Send it to the recipient!", "success")
        }
    })
}