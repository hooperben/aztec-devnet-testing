# aztec-devnet-testing

speed running launching a private program on aztec devnet

#### notes

install the sandbox with:

```bash
bash -i <(curl -s install.aztec.network)
```

you made need to delete your `.aztec` dir

```bash
which aztec
rm -rf <PATH>
```

need to set GH auth with ghcr in order to compile.

then, to start the sandbox,

```
aztec start --sandbox

```

to generate artifacts:

```
bun run codegen
```

to compile:

```
aztec-nargo compile
```

then, to run tests:

```
bun test
```

### Acknowledgements

A lot of the commands and configs in this repo are from [here](https://github.com/AztecProtocol/aztec-starter/tree/main/src)
