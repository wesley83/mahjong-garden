export const MAX_FILE_BYTES=5*1024*1024,MAX_IMAGE_PIXELS=16000000;
const u16=(b,i)=>(b[i]<<8)|b[i+1],u24=(b,i)=>b[i]+b[i+1]*256+b[i+2]*65536;
const ascii=(b,i,n)=>String.fromCharCode(...b.subarray(i,i+n));
export function imageDimensions(input,type) {
 const b=input instanceof Uint8Array?input:new Uint8Array(input);let width,height;
 if(!b.length||b.length>MAX_FILE_BYTES)throw Error('Choose an image up to 5 MB.');
 if(type==='image/png'&&b.length>=24&&ascii(b,0,8)==='\x89PNG\r\n\x1a\n'&&ascii(b,12,4)==='IHDR'){const view=new DataView(b.buffer,b.byteOffset,b.byteLength);width=view.getUint32(16);height=view.getUint32(20);}
 else if(type==='image/jpeg'&&b[0]===255&&b[1]===216){let offset=2,steps=0;while(offset+3<b.length&&++steps<=4096){if(b[offset++]!==255)break;while(b[offset]===255)offset++;const marker=b[offset++];if(marker===217||marker===218)break;if(marker===1||marker>=208&&marker<=215)continue;const size=u16(b,offset);if(size<2||offset+size>b.length)break;if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker)&&size>=8){height=u16(b,offset+3);width=u16(b,offset+5);break;}offset+=size;}}
 else if(type==='image/webp'&&b.length>=30&&ascii(b,0,4)==='RIFF'&&ascii(b,8,4)==='WEBP'){const kind=ascii(b,12,4);if(kind==='VP8X'){width=1+u24(b,24);height=1+u24(b,27);}else if(kind==='VP8 '&&ascii(b,23,3)==='\x9d\x01\x2a'){width=(b[26]|b[27]<<8)&16383;height=(b[28]|b[29]<<8)&16383;}else if(kind==='VP8L'&&b[20]===47){width=1+(b[21]|(b[22]&63)<<8);height=1+(b[22]>>6|b[23]<<2|(b[24]&15)<<10);}}
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width>12000||height>12000||width*height>MAX_IMAGE_PIXELS)throw Error('Image dimensions cannot be verified or exceed 16 megapixels. Choose a smaller PNG, JPEG or WebP.');
 return{width,height};
}
