
import * as ts from 'typescript';
import * as llvm from 'llvm-node';
import {Context} from "./context";
import {NativeType} from "./native-type";

export class NativeTypeResolver {
    static getType(type: ts.Type, ctx: Context): NativeType {
        if (type.isNumberLiteral() || (<any>type).intrinsicName === 'number') {
            return new NativeType(
                llvm.Type.getDoubleTy(
                    ctx.llvmContext
                )
            );
        }

        if (type.isStringLiteral() || (<any>type).intrinsicName === 'string') {
            return new NativeType(
                llvm.Type.getInt8PtrTy(
                    ctx.llvmContext
                )
            );
        }

        if ((<any>type).intrinsicName === 'boolean') {
            return new NativeType(
                llvm.Type.getInt1Ty(
                    ctx.llvmContext
                )
            );
        }

        if ((<any>type).intrinsicName === 'void') {
            return new NativeType(
                llvm.Type.getVoidTy(
                    ctx.llvmContext
                )
            );
        }

        const aliasSymbol = type.aliasSymbol;
        if (aliasSymbol) {
            switch (aliasSymbol.escapedName) {
                case 'int8':
                    return new NativeType(
                        llvm.Type.getInt8Ty(
                            ctx.llvmContext
                        )
                    );
                case 'uint8':
                    return new NativeType(
                        llvm.Type.getInt8Ty(
                            ctx.llvmContext
                        ),
                        true
                    );
                case 'int16':
                    return new NativeType(
                        llvm.Type.getInt16Ty(
                            ctx.llvmContext
                        )
                    );
                case 'uint16':
                    return new NativeType(
                        llvm.Type.getInt16Ty(
                            ctx.llvmContext
                        ),
                        true
                    );
                case 'int32':
                    return new NativeType(
                        llvm.Type.getInt32Ty(
                            ctx.llvmContext
                        )
                    );
                case 'uint32':
                    return new NativeType(
                        llvm.Type.getInt32Ty(
                            ctx.llvmContext
                        ),
                        true
                    );
                case 'int64':
                    return new NativeType(
                        llvm.Type.getInt64Ty(
                            ctx.llvmContext
                        )
                    );
                case 'uint64':
                    return new NativeType(
                        llvm.Type.getInt64Ty(
                            ctx.llvmContext
                        ),
                        true
                    );
                case 'int128':
                    return new NativeType(
                        llvm.Type.getInt128Ty(
                            ctx.llvmContext
                        )
                    );
                case 'uint128':
                    return new NativeType(
                        llvm.Type.getInt128Ty(
                            ctx.llvmContext
                        ),
                        true
                    );
                default:
                    throw new Error(
                        `Unsupported type, "${<string>aliasSymbol.escapedName}"`
                    );
            }
        }

        throw new Error(
            `Unsupported type, it's to dynamic`
        );
    }
}